import { IPhoto } from "../entity/album";
import { useState } from "react";
import { transport } from "../services/Transport";

interface IUsePhotos {
    photos: IPhoto[];
    photo: IPhoto | undefined;

    getPhotos(albumId: string): Promise<void>;

    getPhoto(photoId: string): Promise<void>;
}

export function usePhotos(): IUsePhotos {
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [photo, setPhoto] = useState<IPhoto>()

    const getPhotos = (albumId: string) => {
        return transport.get<IPhoto[]>(`albums/${albumId}/photos`).then(setPhotos)
    }

    const getPhoto = (photoId: string) => {
        return transport.get<IPhoto>(`photos/${photoId}`).then(setPhoto)
    }

    return {photos, photo, getPhotos, getPhoto}
}