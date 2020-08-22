import React, {useEffect, useState} from "react";
import {IComment, IPost} from "../entity/posts";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";

interface IProps {
    comment?: IComment;
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

export const SeparateComment = (comment: IProps) => {
    const classes = styles();
    const comment1 = comment.comment;

    return (
        <Card className={classes.card} variant={"outlined"}>
            <CardHeader
                title={comment1?.name}
            />
            <CardContent className={classes.content}>
                <Typography className={classes.text}>{comment1?.body}</Typography>
            </CardContent>
        </Card>
    )
}