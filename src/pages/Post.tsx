import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router";
import {transport} from "../services/Transport";
import {IComment, IPost} from "../entity/posts";
import {IUser} from "../entity/user";
import {Card, Typography} from "@material-ui/core";
import {PostComments} from "../components/PostComments";
import {Link} from "react-router-dom";

const styles = makeStyles(() => ({
    container: {
        marginTop: "64px",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
        justifyItems: "center",
        padding: 50,
        paddingTop: "50px",
        paddingBottom: "50px",
        alignItems: "flex-start",
        gridRowGap: 20,
    },
    card: {
        width: "100%",
        padding: 15,
        boxSizing: "border-box",
    },
    text: {
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    link: {
        textDecoration: "none",
        display: "grid",
    },
}));

export const Post = () => {
    const classes = styles();
    const { postId } = useParams();
    const [post, setPost] = useState<IPost>();
    const [user, setUser] = useState<IUser>();
    const [users, setUsers] = useState<IUser[]>();
    const [comments, setComments] = useState<IComment[]>()

    useEffect(() => {
        transport.get(`posts/${postId}`).then((postResponse: any) => {
            setPost(postResponse);
        });
        transport.get(`users`).then((usersResponse: any) => {
            setUsers(usersResponse);
        })
    }, [])

    useEffect(() => {
        transport.get(`users/${post?.userId}`).then((userResponse: any) => {
            setUser(userResponse);
        });
        transport.get(`posts/${post?.id}/comments`).then((commentsResponse: any) => {
            setComments(commentsResponse);
        });
    }, [post])

    return (
        <div className={classes.container}>
            <Link to={`/users/${user?.id}`} className={classes.link}>
                <Card className={classes.card} variant={"outlined"}>
                    <Typography variant="h4" align={"center"}>
                        {user?.name}
                    </Typography>
                </Card>
            </Link>
            <Card className={classes.card} variant={"outlined"}>
                <Typography variant="h4" align={"center"}>
                    {post?.title}
                </Typography>
                <Typography variant="body1" paragraph={true} className={classes.text}>
                    {post?.body}
                </Typography>
            </Card>
            <PostComments comments={comments} users={users}/>
        </div>
    )
}