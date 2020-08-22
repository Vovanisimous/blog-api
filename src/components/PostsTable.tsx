import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IPost} from "../entity/posts";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";

interface IProps {
    posts?: IPost[];
}

const styles = makeStyles(() => ({
    tableContainer: {
        marginTop: 10,
    },
    postName: {
        overflow: "hidden",
    },
}));

export const PostsTable = (props: IProps) => {
    const classes = styles();
    const posts = props.posts;

    return (
        <TableContainer className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Posts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="center" className={classes.postName}>
                                <Link to={`/posts/${row.id}`}>{row.title}</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}