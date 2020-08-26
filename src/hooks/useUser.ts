import { IUser } from "../entity/user";
import { useEffect, useState } from "react";
import { transport } from "../services/Transport";

export function useUser(userId: number | undefined): {
    user: IUser | undefined
} {
    const [user, setUser] = useState<IUser>()

    const getUser = () => {
        if (userId) {
            transport.get<IUser>(`users/${userId}`).then(setUser)
        }
    }

    useEffect(() =>{
        getUser()
    }, [userId])

    return {user}
}