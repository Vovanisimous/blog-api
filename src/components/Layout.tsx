import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

interface IProps {
    className?: string;
}

const styles = makeStyles(() => ({
    container: {
        marginTop: "64px",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
        justifyItems: "center",
        padding: 50,
        paddingTop: "50px",
        paddingBottom: "50px",
        alignItems: "flex-start",
        gridRowGap: 20,
    },
}));

export const Layout: FC<IProps> = (props) => {
    const classes = styles();

    return <div className={classNames(classes.container, props.className)}>{props.children}</div>;
};