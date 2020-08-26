import { IPost } from "../entity/posts";
import { useState } from "react";
import { transport } from "../services/Transport";

type TEditPost = Pick<IPost, "title" | "body">

interface IUsePosts {
    posts: IPost[];

    getPosts(): Promise<void>;

    createPost(data: Omit<IPost, "id">): Promise<object>;

    editPost(postId: number | string, data: TEditPost): Promise<object>;

    deletePost(postId: number | string): Promise<void>;
}

export function usePosts(): IUsePosts {
    const [posts, setPosts] = useState<IPost[]>([]);

    const getPosts = () => {
        return transport.get<IPost[]>("/posts").then(setPosts)
    }

    const createPost = (data: IPost) => {
        return transport.post(`/posts`, data)
    }

    const editPost = (postId: number | string, data: TEditPost ) => {
        return transport.put(`/posts/${postId}`, data)
    }

    const deletePost = (postId: number | string) => {
        return transport.delete(`posts/${postId}`).then(getPosts)
    }

    return { posts, getPosts, createPost, editPost, deletePost }
}