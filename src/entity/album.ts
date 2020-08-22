export interface IAlbum {
    userId: string;
    id: number;
    title: string;
}
export interface IPhoto {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}