import { IToDo, IUser } from "../entity/user";
import { useState } from "react";
import { transport } from "../services/Transport";
import { IPost } from "../entity/posts";
import { IAlbum } from "../entity/album";

interface IUseUsers {
    users: IUser[];
    userPosts: IPost[];
    userAlbums: IAlbum[];
    userToDos: IToDo[];

    getUsers(): Promise<void>;

    getUserPosts(userId: string): Promise<void>;

    getUserAlbums(userId: string): Promise<void>;

    getUserToDos(userId: string): Promise<void>;
}

export function useUsers(): IUseUsers {
    const [users, setUsers] = useState<IUser[]>([]);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [userAlbums, setUserAlbums] = useState<IAlbum[]>([])
    const [userToDos, setUserToDos] = useState<IToDo[]>([])

    const getUsers = () => {
        return transport.get<IUser[]>(`users`).then(setUsers)
    }

    const getUserPosts = (userId: string) => {
        return transport.get<IPost[]>(`users/${userId}/posts`).then(setUserPosts)
    }

    const getUserAlbums = (userId: string) => {
        return transport.get<IAlbum[]>(`users/${userId}/albums`).then(setUserAlbums);
    }

    const getUserToDos = (userId: string) => {
        return transport.get<IToDo[]>(`users/${userId}/todos`).then(setUserToDos)
    }

    return  {users, userPosts, userAlbums, userToDos, getUsers, getUserPosts, getUserAlbums, getUserToDos}
}