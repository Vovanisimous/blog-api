import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router";
import {Card, Typography} from "@material-ui/core";
import {PostComments} from "../components/PostComments";
import {Link} from "react-router-dom";
import { Layout } from "../components/Layout";
import { usePost } from "../hooks/usePost";
import { useUsers } from "../hooks/useUsers";
import { useUser } from "../hooks/useUser";
import { useComments } from "../hooks/useComments";

const styles = makeStyles(() => ({
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
    const {users, getUsers} = useUsers();
    const {post} = usePost(postId);
    const {user} = useUser(post?.userId);
    const {postComments, getPostComments} = useComments();

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getPostComments(postId);
    }, [post])

    return (
        <Layout>
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
            <PostComments comments={postComments} users={users}/>
        </Layout>
    )
}