import React, { useContext, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { v4 } from "uuid";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import {transport} from "../services/Transport";
import { Layout } from "../components/Layout";

export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [postSuccess, setPostSuccess] = useState(false);
    const [postError, setPostError] = useState<string | undefined>(undefined);
    const history = useHistory();
    const inputProps = {
        maxLength: 40,
    };

    function randomInt(min: number, max: number) {
        return min + Math.floor((max - min) * Math.random());
    }

    const createPost = () => {
        const userId = randomInt(1, 11);
        const postId = v4();
        const data = {
            id: postId,
            title,
            body,
            userId,
        };
        if (title.length > 0 && title.length > 0) {
            transport.post(`/posts`, data).then(() => {
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