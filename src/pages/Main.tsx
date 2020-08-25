import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { transport } from "../services/Transport";
import { IPost } from "../entity/posts";
import { SeparatePost } from "../components/SeparatePost";
import { IUser } from "../entity/user";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { usePost } from "../hooks/usePost";
import { usePosts } from "../hooks/usePosts";
import { useUsers } from "../hooks/useUsers";

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
    const classes = styles();
    const history = useHistory();
    const { posts, getPosts, deletePost } = usePosts();
    const { users, getUsers } = useUsers();

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        getUsers();
    }, []);

    const onCreatePost = () => {
        history.push(`/createPost`);
    };

    const onDeletePost = (postId: string | number) => {
        deletePost(postId)
    };

    const onEditPost = (postId: number | string) => {
        history.push(`/editPost/${postId}`);
    };

    return (
        <div className={classes.container}>
            <Button variant="contained" color="primary" onClick={onCreatePost}>
                Create a post
            </Button>
            <div className={classes.posts}>
                {posts.map((item) => (
                    <SeparatePost
                        post={item}
                        key={item.id}
                        users={users}
                        onDeletePost={onDeletePost}
                        onEditPost={onEditPost}
                    />
                ))}
            </div>
        </div>
    );
};
