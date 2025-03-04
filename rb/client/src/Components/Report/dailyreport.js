import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function DailyReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const tableHeaders = [
    "Date",
    "Item Type",
    "Process Stage",
    "Status",
    "Total Customers",
  ];

  return (
    <>
     <Typography
           variant="h5"
           style={{
             fontWeight: "bold",
             color: "black",
             marginBottom: 20,
            textAlign:"center"

           }}
         >
           Daily Report
         </Typography>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <Button variant="contained">Filter</Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "aliceblue" }}>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default DailyReport;
