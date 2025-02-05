import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customer() {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    shop: "",
    phone: "",
    address: "",
  });
  const [customers, setCustomers] = useState([]);

  const handleOpen = () => {
    setCustomer({ name: "", shop: "", phone: "", address: "" });
    setEditIndex(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (
      !customer.name ||
      !customer.shop ||
      !customer.phone ||
      !customer.address
    ) {
      toast.error("⚠️ Please fill in all fields!", {
        containerId: "custom-toast",
        theme: "dark",
      });
      return;
    }
    if (!/^\d{10}$/.test(customer.phone)) {
      toast.error("Phone number must be 10 digits!", {
        containerId: "custom-toast",
        theme: "dark",
      });
      return;
    }

    if (editIndex !== null) {
      const updatedCustomers = [...customers];
      updatedCustomers[editIndex] = customer;
      setCustomers(updatedCustomers);
      toast.success("Customer details updated successfully!", {
        containerId: "custom-toast",
        autoClose: 2000,
      });
    } else {
      setCustomers([...customers, customer]);
      toast.success("Customer details added successfully!", {
        containerId: "custom-toast",
        autoClose: 2000,
      });
    }

    handleClose();
  };

  const handleEdit = (index) => {
    setCustomer(customers[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
    toast.error("Deleted successfully!", {
      containerId: "custom-toast",
      autoClose: 2000,
    });
  };

  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <ToastContainer
        containerId="custom-toast"
        position="top-right"
        autoClose={2000}
        style={{
          marginTop: "80px",
          zIndex: 9999,
        }}
      />

      <Typography
        variant="h4"
        style={{
          fontWeight: "bold",
          background: "linear-gradient(to right, #d4af37, #000)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 20,
        }}
      >
        Customer List
      </Typography>

      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          backgroundColor: "#d4af37",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        Add Customer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editIndex !== null ? "Edit Customer Details" : "Add Customer"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Customer Name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Shop Name"
            name="shop"
            value={customer.shop}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#000" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{
              backgroundColor: "#d4af37",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {customers.length > 0 && (
        <TableContainer
          component={Paper}
          style={{ marginTop: 30, borderRadius: 10, overflow: "hidden" }}
        >
          <Table
            style={{ minWidth: "100%", backgroundColor: "#000", color: "#fff" }}
          >
            <TableHead>
              <TableRow style={{ backgroundColor: "#d4af37" }}>
                <TableCell style={styles.headerCell}>Customer Name</TableCell>
                <TableCell style={styles.headerCell}>Shop Name</TableCell>
                <TableCell style={styles.headerCell}>Phone Number</TableCell>
                <TableCell style={styles.headerCell}>Address</TableCell>
                <TableCell style={styles.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((cust, index) => (
                <TableRow
                  key={index}
                  style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <TableCell style={styles.cell}>{cust.name}</TableCell>
                  <TableCell style={styles.cell}>{cust.shop}</TableCell>
                  <TableCell style={styles.cell}>{cust.phone}</TableCell>
                  <TableCell style={styles.cell}>{cust.address}</TableCell>
                 
                  <TableCell style={styles.cell}>
                    <IconButton
                      onClick={() => handleEdit(index)}
                      style={{
                        color: "aliceblue",
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      style={{
                        color: "aliceblue",
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton style={{ color: "aliceblue" }}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

const styles = {
  headerCell: {
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontSize: 18,
  },
  cell: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  evenRow: {
    backgroundColor: "#333",
  },
  oddRow: {
    backgroundColor: "#444",
  },
};

export default Customer;
