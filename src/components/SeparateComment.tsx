import React, {useState} from "react";
import {IComment} from "../entity/posts";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {IUser} from "../entity/user";

interface IProps {
    comment?: IComment;

    users?: IUser[];
}

const styles = makeStyles(() => ({
    card: {
        padding: 20,
        display: "grid",
        gridTemplateColumns: "1fr",
        gridRowGap: 20,
        width: "100%",
        boxSizing: "border-box",
        marginTop: 15,
    },
    text: {
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    content: {
        overflow: "hidden",
    }
}));

export const SeparateComment = (props: IProps) => {
    const classes = styles();
    const { comment } = props;

    return (
            <Card className={classes.card} variant={"outlined"}>
                <CardHeader
                    title={comment?.name}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.text}>{comment?.body}</Typography>
                </CardContent>
            </Card>
    )
}