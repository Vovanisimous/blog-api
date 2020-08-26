import { IComment } from "../entity/posts";
import { useEffect, useState } from "react";
import { transport } from "../services/Transport";

interface IUseComments {
    postComments: IComment[];
}

export function useComments(postId: string): IUseComments  {
    const [postComments, setPostComments] = useState<IComment[]>([])

    const getPostComments = () => {
        if (postId) {
            transport.get<IComment[]>(`posts/${postId}/comments`).then(setPostComments);
        }
    }

    useEffect(() => {
        getPostComments()
    }, [postId])

    return {postComments}
}