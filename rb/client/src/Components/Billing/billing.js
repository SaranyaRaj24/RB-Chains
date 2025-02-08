
import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, TextField, Box, Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Billing = () => {
  const customers = [
    {
      id: 1,
      name: "John",
      address: "123 Main St, Springfield",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "J Smith",
      address: "456 Elm St, Metropolis",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Alice",
      address: "789 Oak St, Gotham",
      phone: "555-123-4567",
    },
    {
      id: 4,
      name: "Charlie",
      address: "101 Maple St, Star City",
      phone: "321-654-0987",
    },
    {
      id: 5,
      name: "Chris",
      address: "505 Pine St, Central City",
      phone: "789-012-3456",
    },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [billNo, setBillNo] = useState("001");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isPrinting, setIsPrinting] = useState(false); 
  const billRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCustomerChange = (event, newValue) => {
    setSelectedCustomer(newValue);
  };

  const handlePrint = () => {
    setIsPrinting(true); 

    setTimeout(() => {
      html2canvas(billRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Bill_${billNo}.pdf`);

        setIsPrinting(false); 
      });
    }, 0);
  };

  return (
    <Box sx={styles.container} ref={billRef}>
      <h1 style={styles.heading}>Estimate Only</h1>

      <Box sx={styles.billInfo}>
        <p>
          <strong>Bill No:</strong> {billNo}
        </p>
        <p>
          <strong>Date:</strong> {date} <br /><br></br>
          <strong>Time:</strong> {time}
        </p>
      </Box>

      <Box
        sx={styles.customerSection}
        style={{ display: isPrinting ? "none" : "block" }}
      >
        <Autocomplete
          options={customers}
          getOptionLabel={(option) => option.name}
          onChange={handleCustomerChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Customer" variant="outlined" />
          )}
          sx={styles.autocomplete}
        />
      </Box>


      {selectedCustomer && (
        <Box sx={styles.customerDetails}>
          <h3>Customer Details:</h3>
          <p>
            <strong>Name:</strong> {selectedCustomer.name}
          </p>
          <p>
            <strong>Address:</strong> {selectedCustomer.address}
          </p>
          <p>
            <strong>Phone:</strong> {selectedCustomer.phone}
          </p>
        </Box>
      )}

  
      <Box sx={styles.itemsSection}>
        <h3>Bill Details:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Touch</th>
              <th style={styles.th}>Weight</th>
              <th style={styles.th}>Pure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Item 1</td>
              <td style={styles.td}>2</td>
              <td style={styles.td}>10</td>
              <td style={styles.td}>20</td>
            </tr>
            <tr>
              <td style={styles.td}>Item 2</td>
              <td style={styles.td}>1</td>
              <td style={styles.td}>15</td>
              <td style={styles.td}>15</td>
            </tr>
          </tbody>
        </table>
      </Box>

   
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={styles.printButton}
        style={{ display: isPrinting ? "none" : "block" }}
      >
        Print Bill
      </Button>
    </Box>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "black",
  },
  billInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  customerSection: {
    marginBottom: "20px",
  },
  autocomplete: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#4CAF50" },
      "&:hover fieldset": { borderColor: "#388E3C" },
      "&.Mui-focused fieldset": { borderColor: "#2E7D32" },
    },
  },
  customerDetails: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  itemsSection: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  printButton: {
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default Billing;



