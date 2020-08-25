import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { transport } from "../services/Transport";
import { IPost } from "../entity/posts";
import { SeparatePost } from "../components/SeparatePost";
import { IUser } from "../entity/user";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

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
    const [posts, setPosts] = useState<IPost[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const history = useHistory();

    useEffect(() => {
        transport.get<IPost[]>("/posts").then((response) => {
            setPosts(response);
        });
    }, []);

    useEffect(() => {
        transport.get<IUser[]>(`users`).then((usersResponse) => {
            setUsers(usersResponse);
        });
    }, []);

    const onCreatePost = () => {
        history.push(`/createPost`);
    };

    const onDeletePost = (postId: string | number) => {
        transport
            .delete(`posts/${postId}`)
            .then(() => transport.get<IPost[]>("/posts").then((response) => setPosts(response)));
    };

    const onEditPost = (postId: any) => {
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
