import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AppContext } from "../app/App";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "white",
        fontSize: "40px",
    },
    logoutButton: {
        marginRight: 20,
    },
    userBox: {
        display: "flex",
        alignItems: "center",
    }
}));

export const Header = () => {
    const classes = useStyles();
    const context = useContext(AppContext);

    const onLogout = () => {
        context.setAuth(false)
        localStorage.removeItem("user")
    }

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Link to={`/`} className={classes.title}>
                    Site
                </Link>
                {context.auth && (
                    <div className={classes.userBox}>
                        <Button variant="contained" className={classes.logoutButton} onClick={onLogout}>
                            Logout
                        </Button>
                        <Typography>{context.user?.email}</Typography>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};
