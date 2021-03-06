import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Layout } from "../components/Layout";
import { usePosts } from "../hooks/usePosts";

export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [postSuccess, setPostSuccess] = useState(false);
    const [postError, setPostError] = useState<string | undefined>(undefined);
    const curPosts  = usePosts()
    const inputProps = {
        maxLength: 40,
    };

    function randomInt(min: number, max: number) {
        return min + Math.floor((max - min) * Math.random());
    }

    const createPost = () => {
        const userId = randomInt(1, 11);
        const data = {
            title,
            body,
            userId,
        };
        if (title.length > 0 && title.length > 0) {
            curPosts.createPost(data).then(() => {
                setTitle("");
                setBody("");
                setPostSuccess(true);
            });
        } else {
            setPostError("You have to write tittle and text!");
        }
    };

    return (
        <Layout>
            <Typography variant="h3" component="h1">
                Write your own post!
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
            <Button variant="contained" color="primary" fullWidth onClick={createPost}>
                Upload
            </Button>
            {postSuccess && <Alert severity="success">Your post has been added!</Alert>}
            {postError && <Alert severity="error">{postError}</Alert>}
        </Layout>
    );
};
