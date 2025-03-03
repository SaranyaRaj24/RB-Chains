
import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CustReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customers, setCustomers] = useState([
    { id: 1, name: "Customer A" },
    { id: 2, name: "Customer B" },
    { id: 3, name: "Customer C" },
  ]);
  const [data, setData] = useState([
    {
      id: 1,
      date: "2023-10-01",
      billNo: "1001",
      customerName: "Customer A",
    },
    {
      id: 2,
      date: "2023-10-02",
      billNo: "1002",
      customerName: "Customer B",
    },
    {
      id: 3,
      date: "2023-10-03",
      billNo: "1003",
      customerName: "Customer C",
    },
  ]);
  const [filteredData, setFilteredData] = useState(data);

  const navigate = useNavigate();

  useEffect(() => {
    let filtered = data;

    if (selectedCustomer) {
      filtered = filtered.filter(
        (item) => item.customerName === selectedCustomer
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedCustomer, searchTerm, data]);

  const handleViewBill = (billNo) => {
    // navigate(`/billing/${billNo}`);
    navigate(`/billing`);
  };

  return (
    <>
      <Typography
        variant="h5"
        style={{
          fontWeight: "bold",
          color: "black",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Customer Report
      </Typography>
      <div style={{ padding: "20px" }}>
        <TextField
          type="date"
          label="From Date"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          type="date"
          label="To Date"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <TextField
          label="Search Customer"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Select Customer</InputLabel>
          <Select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead style={{ backgroundColor: "aliceblue" }}>
              <TableRow>
                <TableCell style={{ color: "black", fontWeight: "bold" }}>
                  SI.NO
                </TableCell>
                <TableCell style={{ color: "black", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell style={{ color: "black", fontWeight: "bold" }}>
                  Bill No
                </TableCell>
                <TableCell style={{ color: "black", fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
                <TableCell style={{ color: "black", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.billNo}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewBill(item.billNo)}>
                        <Visibility style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CustReport;





