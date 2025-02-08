
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Lot() {
  const [open, setOpen] = useState(false);
  const [lotName, setLotName] = useState("");
  const [lots, setLots] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLotName("");
  };

  const handleChange = (e) => setLotName(e.target.value);

  const handleSave = () => {
    if (!lotName) {
      alert("Please enter a lot name");
      return;
    }
    setLots([...lots, lotName]);
    handleClose();
    toast.success("Lot created successfully!");
  };

  const handleDelete = (index) => {
    setLots(lots.filter((_, i) => i !== index));
    toast.error("Lot deleted successfully!");
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleView = (lot) => {
    navigate("/process", { state: { lotName: lot } });
  };

  return (
    <div
      style={{
        maxWidth: "80%",
        margin: "auto",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        style={{
          fontWeight: "bold",
          background: "linear-gradient(to right, #d4af37, #000)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        List of Lots
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{
            backgroundColor: "#d4af37",
            color: "#000",
            fontWeight: "bold",
            width: "150px",
          }}
        >
          Create Lot
        </Button>

        <TextField
          label="Search Lot Name"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          placeholder="Search lot name"
          style={{
            backgroundColor: "#fff",
            width: "30%",
            borderRadius: "8px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#d4af37" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Lot</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Lot Name"
            value={lotName}
            onChange={handleChange}
            fullWidth
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

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow
              style={{ background: "linear-gradient(to right, #000, #d4af37)" }}
            >
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                SI. No
              </TableCell>
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Lot Name
              </TableCell>
              <TableCell
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lots
              .filter((lot) => lot.toLowerCase().includes(search.toLowerCase()))
              .map((lot, index) => (
                <TableRow
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#000" : "#d4af37",
                    color: index % 2 === 0 ? "#fff" : "#000",
                    
                  }}
                >
                  <TableCell
                    style={{
                      color: index % 2 === 0 ? "#fff" : "#000",
                      fontSize: "1rem",
                      fontWeight:"bold",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    style={{ color: index % 2 === 0 ? "#fff" : "#000" }}
                  >
                    {lot}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      style={{ color: index % 2 === 0 ? "#fff" : "#000" }}
                      onClick={() => handleView(lot)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      style={{ color: index % 2 === 0 ? "#fff" : "#000" }}
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          marginTop: "60px",
          zIndex: 9999,
          fontSize: "18px",
          padding: "16px",
          minHeight: "60px",
        }}
      />
    </div>
  );
}

export default Lot;


