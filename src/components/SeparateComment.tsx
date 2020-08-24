import React, {useEffect, useState} from "react";
import {IComment, IPost} from "../entity/posts";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {IUser} from "../entity/user";
import {Link} from "react-router-dom";

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
    const { users, comment } = props;
    const [user, setUser] = useState()

    return (
        <Link to={`/`}>
            <Card className={classes.card} variant={"outlined"}>
                <CardHeader
                    title={comment?.name}
                />
                <CardContent className={classes.content}>
                    <Typography className={classes.text}>{comment?.body}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}