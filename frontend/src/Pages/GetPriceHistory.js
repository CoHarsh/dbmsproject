import React, { useState } from 'react'
// mui import
import {
    TextField,
    Grid,
    Button,
    Typography,
}from '@mui/material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'

function GetPriceHistory() {
    const navigate = useNavigate();
    const [productLink,setProductLink] = useState("");
    const [productHistory,setProductHistory] = useState([]);
    const [productName,setProductName] = useState("Product Name");
    let productspecification = [productName];
    const getpricehistory = () =>{
        // send the link here
        const data = {
            link : productLink
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:4920/pricehistory',requestOptions).then(res => res.json())
        .then(data => {
            console.log(data);
            setProductName(data.product_name);
            setProductHistory(data.rows);
            productspecification = productName.split(',');
        })

        console.log(productLink);
    }


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

  return (
    <div>
        <Grid container spacing={2} style={{margin:'20px'}}>
            <Grid item xs={2} >
                <Button variant="outlined" onClick={e => navigate('/')}>Back</Button>
            </Grid>
    
        </Grid>

        <Typography varient="h2" align="center" variant="h3" component="h3">Price History of Amazon Product</Typography>
         
        <div className="serchbar">
            <TextField id="outlined-basic" variant="outlined" value={productLink} onChange={e => setProductLink(e.target.value)} fullWidth label="Enter Amazon Product link.." />
        </div>
    
        <Button variant="outlined" onClick={getpricehistory}>Search</Button>
       
        <Grid>
            <Grid item xs = {12}>
                <Typography varient="h4" align="center" component="h4" marginTop={5}
                marginBottom={5}>
                    {productName}
                </Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography varient="h3">
                    {productLink}
                </Typography>
            </Grid>
        </Grid>
    

        <TableContainer component={Paper} className="customerTable" sx={{ boxShadow: 3 }}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Price(INR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {productHistory == null ? <p>We are not able to analyse the link</p> : 
            productHistory.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{formatDate(row.end_date)}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
    </div>
  )
}

export default GetPriceHistory