import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router";
import {transport} from "../services/Transport";
import {IUser} from "../entity/user";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {IPost} from "../entity/posts";
import {PostsTable} from "../components/PostsTable";
import {IAlbum} from "../entity/album";
import {AlbumsTable} from "../components/AlbumsTable";

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
    container: {
        marginTop: "64px",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
        justifyItems: "center",
        padding: 50,
        paddingTop: "50px",
        paddingBottom: "50px",
        alignItems: "flex-start",
        gridRowGap: 20,
    },
}));

export const Profile = () => {
    const classes = styles();
    const { userId } = useParams();
    const [user, setUser] = useState<IUser>()
    const [posts, setPosts] = useState<IPost[]>()
    const [albums, setAlbums] = useState<IAlbum[]>()

    useEffect(() => {
        transport.get(`users/${userId}`).then((userResponse: any) => {
            setUser(userResponse);
        });
    }, []);

    useEffect(() => {
        transport.get(`users/${userId}/posts`).then((postsResponse: any) => {
            setPosts(postsResponse);
        });
        transport.get(`users/${userId}/albums`).then((albumsResponse: any) => {
            setAlbums(albumsResponse);
        })
    }, [user])

    useEffect(() => {

    }, [user])

    return (
        <div className={classes.container}>
            <Card className={classes.card} variant={"outlined"}>
                <CardHeader
                    title={user?.username}
                />
                <CardHeader
                    title="User information"
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.text}>Name:{user?.name}</Typography>
                    <Typography className={classes.text}>City: {user?.address.city}</Typography>
                    <Typography className={classes.text}>Address: {user?.address.street} {user?.address.suite}</Typography>
                    <Typography className={classes.text}>Company: {user?.company.name}</Typography>
                    <Typography className={classes.text}>Email: {user?.email}</Typography>
                    <Typography className={classes.text}>Phone number: {user?.phone}</Typography>
                    <Typography className={classes.text}>Website: {user?.website}</Typography>
                </CardContent>
            </Card>
            <PostsTable posts={posts} />
            <AlbumsTable albums={albums} />
        </div>
    )
}