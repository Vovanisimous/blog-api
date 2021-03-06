import React from "react";
import {IToDo} from "../entity/user";
import {makeStyles} from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from "@material-ui/icons";

interface IProps {
    toDos?: IToDo[];
}

const styles = makeStyles(() => ({
    tableContainer: {
        marginTop: 10,
    },
    postName: {
        overflow: "hidden",
    },
}));

export const ToDosTable = (props: IProps) => {
    const classes = styles();
    const { toDos = [] } = props;

    return (
        <TableContainer className={classes.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">To Do's</TableCell>
                        <TableCell align="center">Complete?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {toDos?.map((toDo) => (
                        <TableRow key={toDo.id}>
                            <TableCell align="center" className={classes.postName}>
                                <Typography>{toDo.title}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                {toDo.completed === true ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}