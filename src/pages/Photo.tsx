import React, {useEffect, useState} from "react";
import {IPhoto} from "../entity/album";
import {transport} from "../services/Transport";
import {useParams} from "react-router";
import { Layout } from "../components/Layout";

export const Photo = () => {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState<IPhoto>()

    useEffect(() => {
        transport.get(`photos/${photoId}`).then((photoResponse: any) => {
            setPhoto(photoResponse);
        });
    }, [])

    return (
        <Layout>
            <img src={photo?.url} />
        </Layout>
    )
}