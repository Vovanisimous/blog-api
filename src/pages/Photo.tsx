import React, {useEffect} from "react";
import {useParams} from "react-router";
import { Layout } from "../components/Layout";
import { usePhotos } from "../hooks/usePhotos";

export const Photo = () => {
    const { photoId } = useParams();
    const {photo, getPhoto} = usePhotos();

    useEffect(() => {
        getPhoto(photoId);
    }, [])

    return (
        <Layout>
            <img src={photo?.url} />
        </Layout>
    )
}