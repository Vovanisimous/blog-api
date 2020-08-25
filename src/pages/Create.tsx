import React, { useState } from "react";
import { transport } from "../services/Transport";
import { AxiosError } from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    success: {
        color: "green",
    },
    error: {
        color: "red",
    },
    login: {
        textDecoration: "none",
    },
    root: {
        marginLeft: "auto",
    },
}));

export const Create = () => {
    const classes = styles();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const onRegister = () => {
        if (password === repeatPassword) {
            transport
                .post("/users", {
                    name,
                    username,
                    email,
                    password,
                })
                .then(() => {
                    setEmail("");
                    setName("");
                    setPassword("");
                    setUsername("");
                    setSuccess(true);
                });
        } else {
            setError("Passwords aren't equal!");
            return;
        }
    };

    // const login = () => {
    //     transport.post("/login", {
    //         email, password
    //     }).then(() => {
    //         setEmail("")
    //         setPassword("")
    //     }).catch((e: AxiosError) => {
    //         const resp = e.response;
    //         if (resp) {
    //             setError(resp.data.message)
    //         }
    //     })
    // }

    return (
        <div className={classes.container}>
            <Card className={classes.card} variant="outlined">
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField
                    type={"password"}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    type={"password"}
                    label="Confirm password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={onRegister}>
                    Register
                </Button>
                <Typography className={classes.root}>
                    <Link className={classes.login} to={"/login"}>
                        Login
                    </Link>
                </Typography>
                {success && <p className={classes.success}>Success!</p>}
                {error && <p className={classes.error}>{error}</p>}
            </Card>
        </div>
    );
};
