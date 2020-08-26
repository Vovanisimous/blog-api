import React, { createContext, useEffect, useState } from "react"
import {Header} from "../components/Header";
import {transport} from "../services/Transport";
import { Route, Switch} from "react-router";
import {Main} from "../pages/Main";
import {Post} from "../pages/Post";
import {Profile} from "../pages/Profile";
import {Album} from "../pages/Album";
import {Photo} from "../pages/Photo";
import {CreatePost} from "../pages/CreatePost"
import {EditPost} from "../pages/EditPost"
import { Create } from "../pages/Create";
import { Login } from "../pages/Login";
import { IAppContext } from "../entity/app";
import { IUser } from "../entity/user";

transport.init("http://localhost:3002");

export const AppContext = createContext<IAppContext>({
    auth: false,
    setAuth(value: boolean) {
        return;
    },
    setUser(value: IUser) {
        return;
    }
})

 export const App = () => {
     const [auth, setAuth] = useState(false);
     const [user, setUser] = useState<IUser | undefined>(undefined);

     useEffect(() => {
         const localUser = localStorage.getItem("user");
         if (localUser) {
             setAuth(true);
             setUser(JSON.parse(localUser));
         }
     }, [])

    return (
        <AppContext.Provider value={{auth, user, setAuth, setUser}}>
            <Header />
            <Switch>
                <Route exact path={"/"} component={Main} />
                <Route exact path={"/posts/:postId"} component={Post} />
                <Route exact path={"/users/:userId"} component={Profile} />
                <Route exact path={"/albums/:albumId"} component={Album} />
                <Route exact path={"/albums/:albumId/:photoId"} component={Photo} />
                <Route exact path={"/createPost"} component={CreatePost} />
                <Route exact path={"/editPost/:postId"} component={EditPost} />
                <Route exact path={"/create"} component={Create} />
                <Route exact path={"/login"} component={Login} />
            </Switch>
        </AppContext.Provider>
    )
}
