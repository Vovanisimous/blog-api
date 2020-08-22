import React, {useEffect, useState} from "react";
import {IPost} from "../entity/posts";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";
import {IUser} from "../entity/user";
import {transport} from "../services/Transport";

interface IProps {
    post: IPost;
}

const styles = makeStyles(() => ({
    card: {
        padding: 20,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridRowGap: 20,
        width: "100%",
        boxSizing: "border-box",
    },
    link: {
        textDecoration: "none",
        display: "grid",
    },
    text: {
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    content: {
        overflow: "hidden",
    },
}));

export const SeparatePost = (props: IProps) => {
    const classes = styles();
    const post = props.post;
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        transport.get(`/users/${post.id}`).then((response: any) => {
            setUser(response);
        })
    }, [])

    return (
        <Link to={`/posts/${post.id}`} className={classes.link}>
            <Card className={classes.card} variant={"outlined"}>
                <CardHeader
                    title={post.title}
                    subheader={user?.name}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.text}>{post.body}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}