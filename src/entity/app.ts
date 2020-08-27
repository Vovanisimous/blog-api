import { IUser } from "./user";

export interface IAppContext {
    auth: boolean;
    user?: IUser;

    setAuth(value: boolean): void;

    setUser(value: IUser | undefined): void;
}