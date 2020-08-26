import React, { useEffect, useState } from "react";
import { IPost } from "../entity/posts";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { IUser } from "../entity/user";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface IProps {
    post: IPost;
    users: IUser[];

    onDeletePost?(postId: string | number): void;

    onEditPost?(postId: string | number): void;
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
    buttons: {
        display: "flex",
    },
    button: {
        alignItems: "flex-start",
        marginRight: 10,
    },
}));

export const SeparatePost = (props: IProps) => {
    const classes = styles();
    const post = props.post;
    const userId = post.userId;
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        setUser(props.users[userId - 1]);
    }, [props.users]);

    const del = () => {
        if (props.onDeletePost) {
            props.onDeletePost(post.id);
        }
    };

    const edit = () => {
        if (props.onEditPost) {
            props.onEditPost(post.id);
        }
    };

    return (
        <Card className={classes.card} variant={"outlined"}>
            <Link to={`/posts/${post.id}`} className={classes.link}>
                <CardHeader title={post.title} subheader={user?.name} />
                <CardContent className={classes.content}>
                    <Typography className={classes.text}>{post.body}</Typography>
                </CardContent>
            </Link>
            <div className={classes.buttons}>
                <IconButton aria-label="delete" onClick={del} className={classes.button}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={edit} className={classes.button}>
                    <EditIcon />
                </IconButton>
            </div>
        </Card>
    );
};
