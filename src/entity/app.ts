import { IUser } from "./user";

export interface IAppContext {
    auth: boolean;
    user?: IUser;
}