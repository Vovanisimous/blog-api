export interface IPost {
    userId: number;
    id: number | string;
    title: string;
    body: string;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
