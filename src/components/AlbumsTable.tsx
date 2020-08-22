import React from "react";
import {IAlbum} from "../entity/album";
import {makeStyles} from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";

interface IProps {
    albums?: IAlbum[];
}

const styles = makeStyles(() => ({
    tableContainer: {
        marginTop: 10,
    },
    postName: {
        overflow: "hidden",
    },
}));

export const AlbumsTable = (props: IProps) => {
    const classes = styles();
    const albums = props.albums;

    return (
        <TableContainer className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Albums</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {albums?.map((album) => (
                        <TableRow key={album.id}>
                            <TableCell align="center" className={classes.postName}>
                                <Link to={`/albums/${album.id}`}>{album.title}</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}