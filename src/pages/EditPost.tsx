import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Layout } from "../components/Layout";
import { usePosts } from "../hooks/usePosts";
import { usePost } from "../hooks/usePost";

export const EditPost = () => {
    const [title, setTitle] = useState<string | undefined>(usePost().post?.title);
    const [body, setBody] = useState<string | undefined>(usePost().post?.body);
    const [postSuccess, setPostSuccess] = useState(false);
    const [postError, setPostError] = useState<string | undefined>(undefined);
    const { postId } = useParams();
    const posts = usePosts();
    const inputProps = {
        maxLength: 40,
    };

    const editPost = () => {
        if (title && body) {
            const data = {
                title,
                body,
            };
            if (title.length > 0 && body.length > 0) {
                posts.editPost(`/posts/${postId}`, data).then(() => {
                    setTitle("");
                    setBody("");
                    setPostSuccess(true);
                });
            } else {
                setPostError("You have to write tittle and text!");
            }
        }
    };

    return (
        <Layout>
            <Typography variant="h3" component="h1">
                Edit the post
            </Typography>
            <TextField
                required
                label="Article title"
                variant="outlined"
                fullWidth
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={inputProps}
            />
            <TextField
                required
                label="Article body"
                multiline
                rows={14}
                variant="outlined"
                fullWidth
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={editPost}>
                Edit
            </Button>
            {postSuccess && <Alert severity="success">Your post has been edited!</Alert>}
            {postError && <Alert severity="error">{postError}</Alert>}
        </Layout>
    );
};
