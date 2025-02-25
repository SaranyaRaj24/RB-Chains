
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const processes = [
//   "Melting",
//   "Kambi",
//   "Wire",
//   "Machine",
//   "Soldrine",
//   "Joint",
//   "Cutting",
//   "Finishing",
// ];

// const StyledTableCell = styled(TableCell)({
//   border: "1px solid #ccc",
//   textAlign: "center",
//   padding: "8px",
// });

// const StyledTableContainer = styled(TableContainer)({
//   margin: "20px auto",
//   maxWidth: "100%",
//   border: "1px solid #ccc",
// });

// const StyledInput = styled(TextField)({
//   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//   "& .MuiInputBase-input": {
//     textAlign: "center",
//     padding: "5px",
//   },
//   width: "80px",
// });

// const ProcessTable = () => {
//   const [items, setItems] = useState([
//     { id: 1, touch: "", itemName: "", data: {} },
//   ]);


//   const handleWeightChange = (index, process, field, value) => {
//     const updatedItems = [...items];

//     if (!updatedItems[index].data[process]) {
//       updatedItems[index].data[process] = { beforeWeight: "", afterWeight: "" };
//     }
//     updatedItems[index].data[process][field] = value;

 
//     if (field === "afterWeight") {
//       const nextProcessIndex = processes.indexOf(process) + 1;
//       if (nextProcessIndex < processes.length) {
//         const nextProcess = processes[nextProcessIndex];
//         updatedItems[index].data[nextProcess] = {
//           ...updatedItems[index].data[nextProcess],
//           beforeWeight: value, 
//         };
//       }
//     }

//     setItems(updatedItems);
//   };

  
//   const handleTouchChange = (index, value) => {
//     const updatedItems = [...items];
//     updatedItems[index].touch = value;

//     updatedItems[index].data["Melting"] = {
//       ...updatedItems[index].data["Melting"],
//       beforeWeight: value,
//     };

//     setItems(updatedItems);
//   };


//   const addRow = () => {
//     setItems([
//       ...items,
//       { id: items.length + 1, touch: "", itemName: "", data: {} },
//     ]);
//   };

//   return (
//     <Box sx={{ padding: "20px", textAlign: "right" }}>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={addRow}
//         sx={{ marginBottom: "10px" }}
//       >
//         Add Row
//       </Button>

//       <StyledTableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <StyledTableCell rowSpan={2}>
//                 <b>Raw Gold</b>
//               </StyledTableCell>
//               <StyledTableCell rowSpan={2}>
//                 <b>Item Name</b>
//               </StyledTableCell>
//               {processes.map((process) => (
//                 <StyledTableCell key={process} colSpan={3}>
//                   <b>{process}</b>
//                 </StyledTableCell>
//               ))}
//             </TableRow>
//             <TableRow>
//               {processes.map(() => (
//                 <>
//                   <StyledTableCell>
//                     <b>Before</b>
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <b>After</b>
//                   </StyledTableCell>
//                   <StyledTableCell>
//                     <b>Diff</b>
//                   </StyledTableCell>
//                 </>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {items.map((item, index) => (
//               <TableRow key={item.id}>
//                 <StyledTableCell>
//                   <StyledInput
//                     variant="outlined"
//                     size="small"
//                     value={item.touch}
//                     onChange={(e) => handleTouchChange(index, e.target.value)}
//                   />
//                 </StyledTableCell>
//                 <StyledTableCell>
//                   <StyledInput
//                     variant="outlined"
//                     size="small"
//                     value={item.itemName}
//                     onChange={(e) => {
//                       const updatedItems = [...items];
//                       updatedItems[index].itemName = e.target.value;
//                       setItems(updatedItems);
//                     }}
//                   />
//                 </StyledTableCell>
//                 {processes.map((process) => {
//                   const beforeWeight = item.data[process]?.beforeWeight || "";
//                   const afterWeight = item.data[process]?.afterWeight || "";
//                   const difference =
//                     beforeWeight && afterWeight
//                       ? (
//                           parseFloat(beforeWeight) - parseFloat(afterWeight)
//                         ).toFixed(2)
//                       : "-";

//                   return (
//                     <React.Fragment key={process}>
//                       <StyledTableCell>
//                         <StyledInput
//                           type="number"
//                           variant="outlined"
//                           size="small"
//                           value={beforeWeight}
//                           InputProps={{ readOnly: true }} 
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         <StyledInput
//                           type="number"
//                           variant="outlined"
//                           size="small"
//                           value={afterWeight}
//                           onChange={(e) =>
//                             handleWeightChange(
//                               index,
//                               process,
//                               "afterWeight",
//                               e.target.value
//                             )
//                           }
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         <b>{difference}</b>
//                       </StyledTableCell>
//                     </React.Fragment>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </StyledTableContainer>
//     </Box>
//   );
// };

// export default ProcessTable;



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
} from "@mui/material";
import { styled } from "@mui/material/styles";

const processes = ["Wire", "Machine", "Soldrine", "Cutting", "Finishing"];

const StyledTableCell = styled(TableCell)({
  border: "1px solid #ccc",
  textAlign: "center",
  padding: "8px",
});

const StyledTableContainer = styled(TableContainer)({
  margin: "20px auto",
  maxWidth: "80%",
  border: "1px solid #ccc",
});

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input": {
    textAlign: "center",
    padding: "5px",
  },
  width: "40px",
});

const ProcessTable = () => {
  const [items, setItems] = useState([
    { id: 1, touch: "", itemName: "", kambiWeight: "", data: {} },
  ]);

  const handleWeightChange = (index, process, field, value) => {
    const updatedItems = [...items];
    if (!updatedItems[index].data[process]) {
      updatedItems[index].data[process] = { beforeWeight: "", afterWeight: "" };
    }
    updatedItems[index].data[process][field] = value;
    if (field === "afterWeight") {
      const nextProcessIndex = processes.indexOf(process) + 1;
      if (nextProcessIndex < processes.length) {
        const nextProcess = processes[nextProcessIndex];
        updatedItems[index].data[nextProcess] = {
          ...updatedItems[index].data[nextProcess],
          beforeWeight: value,
        };
      }
    }
    setItems(updatedItems);
  };

  const handleKambiWeightChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].kambiWeight = value;
    updatedItems[index].data["Kambi"] = {
      ...updatedItems[index].data["Kambi"],
      beforeWeight: value,
    };
    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        touch: "",
        itemName: "",
        kambiWeight: "",
        data: {},
      },
    ]);
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "right" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={addRow}
        sx={{ marginBottom: "10px" }}
      >
        Add Row
      </Button>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b>Touch</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Item Type</b>
              </StyledTableCell>
              <StyledTableCell colSpan={3}>
                <b>Melting Process</b>
              </StyledTableCell>
              <StyledTableCell colSpan={3}>
                <b>Kambi Process</b>
              </StyledTableCell>
              <StyledTableCell colSpan={2}>
                <b>Item Details</b>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>
                <b>Before</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>After</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Diff</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Before</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>After</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Diff</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Item Name</b>
              </StyledTableCell>
              <StyledTableCell>
                <b>Item Weight</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <StyledTableCell>
                  <StyledInput
                    type="number"
                    variant="outlined"
                    size="small"
                    value={item.touch}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].touch = e.target.value;
                      setItems(updatedItems);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledInput
                    variant="outlined"
                    size="small"
                    value={item.itemName}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].itemName = e.target.value;
                      setItems(updatedItems);
                    }}
                  />
                </StyledTableCell>
                {(() => {
                  const meltingBeforeWeight =
                    item.data["Melting"]?.beforeWeight || "";
                  const meltingAfterWeight =
                    item.data["Melting"]?.afterWeight || "";
                  const meltingDifference =
                    meltingBeforeWeight && meltingAfterWeight
                      ? (
                          parseFloat(meltingBeforeWeight) -
                          parseFloat(meltingAfterWeight)
                        ).toFixed(2)
                      : "-";
                  return (
                    <>
                      <StyledTableCell>
                        <StyledInput
                          type="number"
                          variant="outlined"
                          size="small"
                          value={meltingBeforeWeight}
                          onChange={(e) =>
                            handleWeightChange(
                              index,
                              "Melting",
                              "beforeWeight",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledInput
                          type="number"
                          variant="outlined"
                          size="small"
                          value={meltingAfterWeight}
                          onChange={(e) =>
                            handleWeightChange(
                              index,
                              "Melting",
                              "afterWeight",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>{meltingDifference}</b>
                      </StyledTableCell>
                    </>
                  );
                })()}
                {(() => {
                  const kambiBeforeWeight =
                    item.data["Kambi"]?.beforeWeight || "";
                  const kambiAfterWeight =
                    item.data["Kambi"]?.afterWeight || "";
                  const kambiDifference =
                    kambiBeforeWeight && kambiAfterWeight
                      ? (
                          parseFloat(kambiBeforeWeight) -
                          parseFloat(kambiAfterWeight)
                        ).toFixed(2)
                      : "-";
                  return (
                    <>
                      <StyledTableCell>
                        <StyledInput
                          type="number"
                          variant="outlined"
                          size="small"
                          value={kambiBeforeWeight}
                          InputProps={{ readOnly: true }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledInput
                          type="number"
                          variant="outlined"
                          size="small"
                          value={kambiAfterWeight}
                          onChange={(e) =>
                            handleWeightChange(
                              index,
                              "Kambi",
                              "afterWeight",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>{kambiDifference}</b>
                      </StyledTableCell>
                    </>
                  );
                })()}
                <StyledTableCell>
                  <StyledInput
                    variant="outlined"
                    size="small"
                    value={item.itemName}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].itemName = e.target.value;
                      setItems(updatedItems);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledInput
                    variant="outlined"
                    size="small"
                    value={item.kambiWeight}
                    readOnly
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {processes.map((process) => (
                <StyledTableCell key={process} colSpan={3}>
                  <b>{process}</b>
                </StyledTableCell>
              ))}
            </TableRow>
            <TableRow>
              {processes.map(() => (
                <>
                  <StyledTableCell>
                    <b>Before</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>After</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Diff</b>
                  </StyledTableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                {processes.map((process) => {
                  const beforeWeight = item.data[process]?.beforeWeight || "";
                  const afterWeight = item.data[process]?.afterWeight || "";
                  const difference =
                    beforeWeight && afterWeight
                      ? (
                          parseFloat(beforeWeight) - parseFloat(afterWeight)
                        ).toFixed(2)
                      : "-";
                  return (
                    <React.Fragment key={process}>
                      <StyledTableCell>
                        <StyledInput
                          type="number"
                          variant="outlined"
                          size="small"
                          value={beforeWeight}
                          InputProps={{ readOnly: true }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledInput
                          type="number"
                          variant="outlined"
                          size="small"
                          value={afterWeight}
                          onChange={(e) =>
                            handleWeightChange(
                              index,
                              process,
                              "afterWeight",
                              e.target.value
                            )
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <b>{difference}</b>
                      </StyledTableCell>
                    </React.Fragment>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default ProcessTable;


