import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { PostsTable } from "../components/PostsTable";
import { AlbumsTable } from "../components/AlbumsTable";
import { ToDosTable } from "../components/ToDosTable";
import { Layout } from "../components/Layout";
import { useUser } from "../hooks/useUser";
import { useUsers } from "../hooks/useUsers";

const styles = makeStyles(() => ({
    card: {
        padding: 20,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridRowGap: 20,
        width: "100%",
        boxSizing: "border-box",
        marginTop: 15,
    },
    text: {
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    content: {
        overflow: "hidden",
    },
}));

export const Profile = () => {
    const classes = styles();
    const { userId } = useParams();
    const {user} = useUser(userId);
    const {userPosts, getUserPosts, userAlbums, getUserAlbums, userToDos, getUserToDos} = useUsers();

    useEffect(() => {
        getUserPosts(userId);
        getUserAlbums(userId);
        getUserToDos(userId)
    }, [user]);

    return (
        <Layout>
            <Card className={classes.card} variant={"outlined"}>
                <CardHeader title={user?.username} />
                <CardHeader title="User information:" />
                <CardContent className={classes.content}>
                    <Typography className={classes.text}>Name:{user?.name}</Typography>
                    <Typography className={classes.text}>City: {user?.address.city}</Typography>
                    <Typography className={classes.text}>
                        Address: {user?.address.street} {user?.address.suite}
                    </Typography>
                    <Typography className={classes.text}>Company: {user?.company.name}</Typography>
                    <Typography className={classes.text}>Email: {user?.email}</Typography>
                    <Typography className={classes.text}>Phone number: {user?.phone}</Typography>
                    <Typography className={classes.text}>Website: {user?.website}</Typography>
                </CardContent>
            </Card>
            <PostsTable posts={userPosts} />
            <AlbumsTable albums={userAlbums} />
            <ToDosTable toDos={userToDos} />
        </Layout>
    );
};
