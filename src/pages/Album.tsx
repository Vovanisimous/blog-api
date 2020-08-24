import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {transport} from "../services/Transport";
import {IPhoto} from "../entity/album";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Layout } from "../components/Layout";

const styles = makeStyles(() => ({
    container: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr"
    },
    photoContainer: {
        width: "50%",
        textAlign: "center",
    }
}));

export const Album = () => {
    const { albumId } = useParams();
    const classes = styles();
    const [photos, setPhotos] = useState<IPhoto[]>();

    useEffect(() => {
        transport.get(`albums/${albumId}/photos`).then((photosResponse: any) => {
            setPhotos(photosResponse);
        })
    }, [])

    return (
        <Layout className={classes.container}>
            {photos?.map((photo:IPhoto) => (
                <Link to={`/albums/${photo.albumId}/${photo.id}`} key={photo.id} className={classes.photoContainer}>
                    <img src={photo.thumbnailUrl} />
                    <Typography>{photo.title}</Typography>
                </Link>
            ))}
        </Layout>
    )
}