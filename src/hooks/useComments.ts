import { IComment } from "../entity/posts";
import { useState } from "react";
import { transport } from "../services/Transport";

interface IUseComments {
    postComments: IComment[];

    getPostComments(postId: string): Promise<void>;
}

export function useComments(): IUseComments  {
    const [postComments, setPostComments] = useState<IComment[]>([])

    const getPostComments = (postId: string) => {
        return transport.get<IComment[]>(`posts/${postId}/comments`).then(setPostComments);
    }

    return {postComments, getPostComments}
}