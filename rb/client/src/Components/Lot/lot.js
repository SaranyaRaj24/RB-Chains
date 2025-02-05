
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  IconButton,
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

      <Grid
        container
        spacing={0.5}
        style={{
          marginTop: "10px",
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {lots
          .filter((lot) => lot.toLowerCase().includes(search.toLowerCase()))
          .map((lot, index) => (
            <Grid item key={index}>
              <Card
                style={{
                  background: "linear-gradient(to bottom, #000, #d4af37)",
                  color: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  textAlign: "center",
                  width: "10rem",
                  height: "90px",
                  margin: "4px",
                }}
              >
                <CardContent style={{ padding: "8px" }}>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "21px",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {lot}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <IconButton
                      size="small"
                      style={{ color: "#fff" }}
                      onClick={() => handleView(lot)} 
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      style={{ color: "#fff" }}
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

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
