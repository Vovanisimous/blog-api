import { IPost } from "../entity/posts";
import { useEffect, useState } from "react";
import { transport } from "../services/Transport";

export function usePost(postId?: string): {
    post: IPost | undefined;
} {
    const [post, setPost] = useState<IPost>();

    const getPost = () => {
        if (postId) {
            transport.get<IPost>(`posts/${postId}`).then(setPost);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    return { post };
}
