import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IPhoto} from "../entity/album";
import {transport} from "../services/Transport";
import {useParams} from "react-router";

const styles = makeStyles(() => ({
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

export const Photo = () => {
    const classes = styles();
    const { photoId } = useParams();
    const [photo, setPhoto] = useState<IPhoto>()

    useEffect(() => {
        transport.get(`photos/${photoId}`).then((photoResponse: any) => {
            setPhoto(photoResponse);
        });
    }, [])

    return (
        <div className={classes.container}>
            <img src={photo?.url} />
        </div>
    )
}