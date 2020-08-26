import { transport } from "../services/Transport";
import { useContext } from "react";
import { AppContext } from "../app/App";

interface IAuth {
    onLogin: (email: string, password: string) => Promise<any>;

    onLogout: () => void;

    onRegister: (
        path: string,
        body: { name: string; username: string; email: string; password: string },
    ) => Promise<object>;
}

export const useAuth = (): IAuth => {
    const context = useContext(AppContext);

    const onLogin = (email: string, password: string) => {
        return transport.post<any, { email: string; password: string }>("/login", {
            email,
            password,
        });
    };

    const onLogout = () => {
        context.setAuth(false);
        localStorage.removeItem("user");
    };

    const onRegister = (
        path: string,
        body: { name: string; username: string; email: string; password: string },
    ) => {
        return transport.post("/users", body);
    };

    return { onLogin, onLogout, onRegister };
};
