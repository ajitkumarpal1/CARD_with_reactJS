import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Services } from "../services/services";

const StyledBox = styled(Box)({
    marginRight: 'auto',
    marginLeft: 'auto',
});

export const ToDoList = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [rows, setRows] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [indexCrent, setIndexCrent] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        const allData = await Services.get();
        setRows(allData.data.data);
    };

    const editSave = (row, index) => {
        setEdit(true);
        setEditIndex(row._id);
        setIndexCrent(index)
        setName(row.name);
        setAddress(row.address);
        setPhone(row.phone);
        //Services.edit(index, row);
    };

    const btnInsert = async () => {
        const newRow = await Services.in({ name, address, phone });
        setRows(prevRows => [...prevRows, newRow]);
        setName("");
        setAddress("");
        setPhone("");
    };

    const deleteRow = async (id, index) => {
        await Services.delete(id);
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    return (
        <>
            <StyledBox
                sx={{
                    width: 1000,
                    maxWidth: '100%',
                }}
            >
                <h1>ToDoList</h1>
                <TextField
                    id="name"
                    sx={{ marginBottom: 2 }}
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="data"
                    sx={{ marginBottom: 2 }}
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    id="phone"
                    sx={{ marginBottom: 2 }}
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Stack sx={{ marginBottom: 2 }} spacing={2} direction="row">
                    <Button disabled={edit} onClick={btnInsert} variant="contained">
                        Insert
                    </Button>
                    <Button disabled={edit} variant="contained" color="error">
                        Delete
                    </Button>
                    <Button
                        disabled={!edit}
                        variant="contained"
                        color="success"
                        onClick={async () => {
                            let update = await Services.edit(editIndex, { name, address, phone });
                            console.log(update);
                            const updatedRows = [...rows];
                            updatedRows[indexCrent] = { ...updatedRows[indexCrent], name, address, phone };
                            setRows(updatedRows);
                            setEdit(false);
                            setIndexCrent(null);
                        }}
                    >
                        Save
                    </Button>
                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <caption>A basic table example with a caption</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Sr_No</b>
                                </TableCell>
                                <TableCell>
                                    <b>Name</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Address</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Phone</b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>Action</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            sx={{ marginRight: '10px' }}
                                            onClick={() => editSave(row, index)}
                                            variant="contained"
                                            color="success"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => deleteRow(row._id, index)}
                                            variant="contained"
                                            color="error"
                                            disabled={edit && indexCrent !== index}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledBox>
            <h1>{rows.length}</h1>
        </>
    );
};
