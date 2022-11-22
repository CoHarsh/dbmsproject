import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'


import {useState,useEffect} from 'react';
import { Button, Grid } from '@mui/material';

import {DeleteForever} from '@mui/icons-material';


function Manufacturer() {
    const navigate = useNavigate();

    const [datas,setData] = useState([]);
    const [reload,setreload] = useState("");

    useEffect(() => {
        fetch('http://localhost:4920/users')
        .then(res => res.json())
        .then(json => {
            setData(json);
        })
    },[,reload])

    useEffect(() => {
        console.log(datas);
    },[datas])

    const deletePermenet = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch(`http://localhost:4920/users/${id}`, requestOptions)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            setreload(data);
        })
    }

  return (
    <>
        <div>
            <Grid container style={{margin:'20px'}}>
                <Grid item xs = {2}>
                    <Button onClick={() => navigate("/")} variant="outlined">Back</Button>
                </Grid>

            </Grid>
            
        <TableContainer component={Paper} className="customerTable" sx={{ boxShadow: 3 }}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Manufacture ID</TableCell>
                    <TableCell align="center">Manufacture Name</TableCell>
                    <TableCell align="center">Rating</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {datas.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{row.manf_id}</TableCell>
                    <TableCell align="center">{row.manf_name}</TableCell>
                    <TableCell align="center">{row.rating}</TableCell>
                    <TableCell align="center"><DeleteForever onClick={() =>deletePermenet(row.manf_id)} /></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>




        </div>
    
    
    </>
  )
}

export default Manufacturer