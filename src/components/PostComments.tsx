import React from "react";
import {IComment} from "../entity/posts";
import {makeStyles} from "@material-ui/core/styles";
import {Card, Typography} from "@material-ui/core";
import {SeparateComment} from "./SeparateComment";
import {IUser} from "../entity/user";

interface IProps {
    comments: IComment[] | undefined;
}

const styles = makeStyles(() => ({
    card: {
        width: "100%",
        padding: 15,
        boxSizing: "border-box",
    },
}));

export const PostComments = (comments: IProps) => {
    const classes = styles();

    return (
        <Card className={classes.card} variant={"outlined"}>
            <Typography variant={"h4"}>Comments:</Typography>
            <div>
                {comments.comments?.map((item: IComment) => {
                    return <SeparateComment key={item.id} comment={item}/>
                })}
            </div>
        </Card>
    )
}