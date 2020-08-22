import React from "react"
import {Header} from "../components/Header";
import {transport} from "../services/Transport";
import { Route, Switch} from "react-router";
import {Main} from "../pages/Main";
import {Post} from "../pages/Post";
import {Profile} from "../pages/Profile";
transport.init("https://jsonplaceholder.typicode.com");

 export const App = () => {

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path={"/"} component={Main} />
                <Route exact path={"/posts/:postId"} component={Post} />
                <Route exact path={"/users/:userId"} component={Profile} />
            </Switch>
        </div>
    )
}
