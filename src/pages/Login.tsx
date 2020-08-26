import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() => ({
    container: {
        height: "100vh",
        position: "relative",
    },
    card: {
        padding: 20,
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 600,
        transform: "translate(-50%, -50%)",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridRowGap: 20,
    },
    register: {
        textDecoration: "none",
    },
    root: {
        marginLeft: "auto",
    },
    error: {
        color: "red",
    },
}));

export const Login = () => {
    const classes = styles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);
    const history = useHistory();

    const onLogin = () => {

    };

    return (
        <div className={classes.container}>
            <Card className={classes.card} variant="outlined">
                <TextField
                    id="standard-basic"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Password"
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={onLogin}>
                    Login
                </Button>
                <Typography className={classes.root}>
                    <Link className={classes.register} to={"/create"}>
                        Register
                    </Link>
                </Typography>
                {error && <p className={classes.error}>{error}</p>}
            </Card>
        </div>
    );
};