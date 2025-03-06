
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const processes = [
  "Melting",
  "Kambi",
  "Wire",
  "Machine",
  "Soldrine",
  "Joint",
  "Cutting",
  "Finishing",
];

const StyledTableCell = styled(TableCell)({
  border: "1px solid #ccc",
  textAlign: "center",
  padding: "8px",
});

const StyledTableContainer = styled(TableContainer)({
  margin: "20px auto",
  maxWidth: "100%",
  border: "1px solid #ccc",
});

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input": {
    textAlign: "center",
    padding: "5px",
  },
  width: "80px",
});

const ProcessTable = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialWeight, setInitialWeight] = useState("");
  const [isLotCreated, setIsLotCreated] = useState(false);

  const handleWeightChange = (index, process, field, value) => {
    const updatedItems = [...items];
    if (!updatedItems[index].data[process]) {
      updatedItems[index].data[process] = { beforeWeight: "", afterWeight: "" };
    }
    updatedItems[index].data[process][field] = value;
    setItems(updatedItems);
  };

  const handleTouchChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].touch = value;
    setItems(updatedItems);
  };

  const addRow = (weight) => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        touch: weight,
        itemName: "",
        data: {},
        kambiNotes: [],
      },
    ]);
  };

  // const handleAddItemColumns = (index) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].kambiNotes.push({ name: "", weight: "" });
  //   setItems(updatedItems);
  // };

  const handleAddItemColumns = (index) => {
  const updatedItems = [...items];
  updatedItems[index].kambiNotes.push({
    name: "",
    weight: "",
    data: processes.reduce((acc, process) => {
      acc[process] = { beforeWeight: "", afterWeight: "" };
      return acc;
    }, {})
  });
  setItems(updatedItems);
};

  const handleCreateLot = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (initialWeight) {
      addRow(initialWeight); 
      setInitialWeight("");
      setOpen(false);
      setIsLotCreated(true); 
    }
  };

  const calculateTotal = (items, process, field) => {
    return items
      .reduce((total, item) => {
        const value = parseFloat(item.data[process]?.[field] || 0);
        return total + (isNaN(value) ? 0 : value);
      }, 0)
      .toFixed(2);
  };
console.log("Processes:", processes);


  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ textAlign: "right", marginBottom: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLot}
          sx={{ marginRight: "10px" }}
          // Disable "Create Lot" after it's clicked
        >
          Create Lot
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled
          sx={{ marginRight: "10px" }}
        >
          Add Row
        </Button>
      </Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b>Raw Gold</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Item Name</b>
              </StyledTableCell>
              {processes.map((process) => (
                <StyledTableCell
                  key={process}
                  colSpan={process === "Kambi" ? 5 : 3}
                >
                  <b>{process}</b>
                </StyledTableCell>
              ))}
              <StyledTableCell>
                <b>Actions</b>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2} />
              {processes.map((process) => (
                <React.Fragment key={process}>
                  <StyledTableCell>
                    <b>Before</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>After</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Diff</b>
                  </StyledTableCell>
                  {process === "Kambi" && (
                    <>
                      <StyledTableCell>
                        <b>Name</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>Weight</b>
                      </StyledTableCell>
                    </>
                  )}
                </React.Fragment>
              ))}
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, rowIndex) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <StyledTableCell>
                    <StyledInput
                      value={item.touch}
                      onChange={(e) =>
                        handleTouchChange(rowIndex, e.target.value)
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledInput
                      value={item.itemName}
                      onChange={(e) => {
                        const updatedItems = [...items];
                        updatedItems[rowIndex].itemName = e.target.value;
                        setItems(updatedItems);
                      }}
                    />
                  </StyledTableCell>
                  {processes.map((process) => (
                    <React.Fragment key={process}>
                      <StyledTableCell>
                        <StyledInput
                          value={item.data[process]?.beforeWeight || ""}
                          onChange={(e) =>
                            handleWeightChange(
                              rowIndex,
                              process,
                              "beforeWeight",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledInput
                          value={item.data[process]?.afterWeight || ""}
                          onChange={(e) =>
                            handleWeightChange(
                              rowIndex,
                              process,
                              "afterWeight",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>
                          {item.data[process]?.beforeWeight &&
                          item.data[process]?.afterWeight
                            ? (
                                parseFloat(item.data[process].beforeWeight) -
                                parseFloat(item.data[process].afterWeight)
                              ).toFixed(2)
                            : "-"}
                        </b>
                      </StyledTableCell>
                      {process === "Kambi" && <StyledTableCell colSpan={2} />}
                    </React.Fragment>
                  ))}
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAddItemColumns(rowIndex)}
                    >
                      Add Item
                    </Button>
                  </StyledTableCell>
                </TableRow>

                {/* {item.kambiNotes.map((note, noteIndex) => (
                  <TableRow key={noteIndex}>
                    <StyledTableCell colSpan={2} />
                    {processes.map((process) => (
                      <React.Fragment key={process}>
                        {process === "Kambi" ? (
                          <React.Fragment>
                            <StyledTableCell colSpan={3} />
                            <StyledTableCell >
                              <StyledInput
                                value={note.name}
                                onChange={(e) => {
                                  const updatedItems = [...items];
                                  updatedItems[rowIndex].kambiNotes[
                                    noteIndex
                                  ].name = e.target.value;
                                  setItems(updatedItems);
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell >
                              <StyledInput
                                value={note.weight}
                                onChange={(e) => {
                                  const updatedItems = [...items];
                                  updatedItems[rowIndex].kambiNotes[
                                    noteIndex
                                  ].weight = e.target.value;
                                  setItems(updatedItems);
                                }}
                              />
                            </StyledTableCell>
                          </React.Fragment>
                        ) : (
                          <StyledTableCell colSpan={3} />
                        )}
                      </React.Fragment>
                    ))}
                    <StyledTableCell />
                  </TableRow>
                ))} */}
                {item.kambiNotes.map((note, noteIndex) => (
                  <TableRow key={noteIndex}>
                    <StyledTableCell colSpan={2} />
                    {processes.map((process) => (
                      <React.Fragment key={process}>
                        <StyledTableCell>
                          <StyledInput
                            value={note.data[process]?.beforeWeight || ""}
                            onChange={(e) => {
                              const updatedItems = [...items];
                              updatedItems[rowIndex].kambiNotes[noteIndex].data[
                                process
                              ].beforeWeight = e.target.value;
                              setItems(updatedItems);
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledInput
                            value={note.data[process]?.afterWeight || ""}
                            onChange={(e) => {
                              const updatedItems = [...items];
                              updatedItems[rowIndex].kambiNotes[noteIndex].data[
                                process
                              ].afterWeight = e.target.value;
                              setItems(updatedItems);
                            }}
                          />
                        </StyledTableCell>
                   
                        <StyledTableCell>
                          <b>
                            {note.data[process]?.beforeWeight &&
                            note.data[process]?.afterWeight
                              ? (
                                  parseFloat(note.data[process].beforeWeight) -
                                  parseFloat(note.data[process].afterWeight)
                                ).toFixed(2)
                              : "-"}
                          </b>
                        </StyledTableCell>
                      </React.Fragment>
                    ))}
                    <StyledTableCell />
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
            <TableRow>
              <StyledTableCell colSpan={2}>
                <b>Total</b>
              </StyledTableCell>
              {processes.map((process) => (
                <React.Fragment key={process}>
                  <StyledTableCell>
                    <b>{calculateTotal(items, process, "beforeWeight")}</b>
                  </StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell>
                    <b>{calculateTotal(items, process, "diff")}</b>
                  </StyledTableCell>
                  {process === "Kambi" && <StyledTableCell colSpan={2} />}
                </React.Fragment>
              ))}
              <StyledTableCell />
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Enter Initial Weight
          </Typography>
          <TextField
            fullWidth
            label="Initial Weight"
            value={initialWeight}
            onChange={(e) => setInitialWeight(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProcessTable;









