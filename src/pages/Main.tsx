import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {transport} from "../services/Transport";
import {IPost} from "../entity/posts";
import {SeparatePost} from "../components/SeparatePost";
import { IUser } from "../entity/user";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const styles = makeStyles(() => ({
    container: {
        position: "relative",
        marginTop: 80,
        padding: 50,
    },
    posts: {
        display: "grid",
        gridRowGap: 40,
    },
}));

export const Main = () => {
    const classes = styles()
    const [posts, setPosts] = useState<IPost[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const history = useHistory();

    useEffect(() => {
        transport.get("/posts").then((response: any) => {
            setPosts(response);
        });
    }, [])

    useEffect(() => {
        transport.get(`users`).then((usersResponse: any) => {
            setUsers(usersResponse);
        });
    }, [])

    const onCreatePost = () => {
        history.push(`/createPost`)
    }

    const onDelePost = (postId: any) => {
        transport.delete(`posts/${postId}`)
    }

    return (
        <div className={classes.container}>
            <Button variant="contained" color="primary" onClick={onCreatePost}>
                Create a post
            </Button>
            <div className={classes.posts}>
                {posts.map((item) => (
                    <SeparatePost post={item} key={item.id} users={users} onDeletePost={onDelePost}/>
                ))}
            </div>
        </div>
    )
}