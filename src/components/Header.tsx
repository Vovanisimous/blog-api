import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

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
}));

export const Header = () => {
    const classes = useStyles();

    return (
            <AppBar position="fixed">
                <Toolbar>
                    <Link to={`/`} className={classes.title}>
                        Site
                    </Link>
                </Toolbar>
            </AppBar>
    )
}