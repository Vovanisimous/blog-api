import React, { useContext, useState, useEffect } from "react";
import {useParams} from "react-router";
import { Button, TextField, Typography } from "@material-ui/core";
import { v4 } from "uuid";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import {transport} from "../services/Transport";
import { Layout } from "../components/Layout";
import {IPost} from "../entity/posts";

export const EditPost = () => {
    const [post, setPost] = useState<IPost>()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [postSuccess, setPostSuccess] = useState(false);
    const [postError, setPostError] = useState(false);
    const {postId} = useParams();
    const history = useHistory();
    const inputProps = {
        maxLength: 40,
    };

    useEffect(() => {
        transport.get<IPost>(`posts/${postId}`).then((postResponse) => {
            setPost(postResponse);
            setTitle(postResponse.title);
            setBody(postResponse.body)
        })
    }, [postId])

    function randomInt(min: number, max: number) {
        return min + Math.floor((max - min) * Math.random());
    }

    const editPost = () => {
        const data = {
            title,
            body,
        };
        if (title.length > 0 && title.length > 0) {
            transport.put(`/posts/${postId}`, data).then(() => {
                setTitle("");
                setBody("");
                setPostSuccess(true);
            });
        } else {
            setPostError(true);
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
            {postError && <Alert severity="error">You have to write tittle and text!</Alert>}
        </Layout>
    );
};