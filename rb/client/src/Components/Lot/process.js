
import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {  toast ,ToastContainer} from "react-toastify";


function Process() {
  const { id, lotName } = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const [processData, setProcessData] = useState([
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
    {
      beforeWeight: "",
      afterWeight: "",
      difference: null,
      item1Name: "",
      item1Weight: "",
      item2Name: "",
      item2Weight: "",
    },
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
  ]);

  const steps = [
    "Scrap Gold",
    "Melting Process",
    "Kambi Process",
    "Initial Item Weight",
    "Kambi Process 2",
    "Machine Process 1",
    "Machine Process 2",
    "Color Process",
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleFinish();
    } else {
      if (activeStep === 0 && processData[0].beforeWeight === "") {
        alert("Please enter the gold weight.");
        return;
      }
      if (
        activeStep === 1 &&
        (processData[1].beforeWeight === "" ||
          processData[1].afterWeight === "")
      ) {
        alert("Please enter both before and after weight.");
        return;
      }

      const updatedData = [...processData];
      if (activeStep > 0 && activeStep !== 3) {
        const before = parseFloat(updatedData[activeStep].beforeWeight) || 0;
        const after = parseFloat(updatedData[activeStep].afterWeight) || 0;
        updatedData[activeStep].difference = before - after;
      }

      if (activeStep === 3) {
        const totalWeight = parseFloat(updatedData[3].beforeWeight) || 0;
        const item1Weight = parseFloat(updatedData[3].item1Weight) || 0;
        const item2Weight = parseFloat(updatedData[3].item2Weight) || 0;

        if (item1Weight + item2Weight !== totalWeight) {
          alert("The sum of item weights must equal the total weight.");
          return;
        }

        updatedData[4].beforeWeight = item1Weight;
        updatedData[5].beforeWeight = item2Weight;
      }

      if (activeStep < steps.length - 1 && activeStep !== 3) {
        updatedData[activeStep + 1].beforeWeight =
          updatedData[activeStep].afterWeight ||
          updatedData[activeStep].beforeWeight;
      }

      setProcessData(updatedData);
      setActiveStep(activeStep + 1);
    }
  };

  const handleFinish = async () => {
    console.log("processData before sending:", processData);

    const processedData = processData.map((process, index) => ({
      lotId: id,
      lot_name: lotName,
      processName: steps[index],
      beforeWeight: process.beforeWeight,
      afterWeight: process.afterWeight,
      difference: process.difference,
      item1Name: process.item1Name || "",
      item1Weight: process.item1Weight || null,
      item2Name: process.item2Name || "",
      item2Weight: process.item2Weight || null,
    }));

    console.log("Processed data to send:", processedData);

    try {
      const response = await fetch("http://localhost:5000/api/process/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data);

      toast.success("Process saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save process. Please try again.");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleWeightChange = (e, processIndex, weightType) => {
    const value = e.target.value;
    const updatedData = [...processData];
    updatedData[processIndex][weightType] = value;
    setProcessData(updatedData);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div style={{ marginTop: "20px" }}>
        {activeStep === steps.length ? (
          <Typography variant="h6">All Processes Completed</Typography>
        ) : (
          <div>
            <Typography variant="h6">{steps[activeStep]}</Typography>

            {activeStep === 0 && (
              <TextField
                label="Enter Gold Weight"
                value={processData[0].beforeWeight}
                onChange={(e) => handleWeightChange(e, 0, "beforeWeight")}
                fullWidth
                margin="normal"
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            )}

            {activeStep > 0 && activeStep < 3 && (
              <div>
                <TextField
                  label="Enter Before Weight"
                  value={processData[activeStep].beforeWeight}
                  onChange={(e) =>
                    handleWeightChange(e, activeStep, "beforeWeight")
                  }
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <TextField
                  label="Enter After Weight"
                  value={processData[activeStep].afterWeight}
                  onChange={(e) =>
                    handleWeightChange(e, activeStep, "afterWeight")
                  }
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                {processData[activeStep].difference !== null && (
                  <Typography variant="body1">
                    Weight Difference: {processData[activeStep].difference}
                  </Typography>
                )}
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <TextField
                  label="Enter Initial Item Weight"
                  value={processData[3].beforeWeight}
                  onChange={(e) => handleWeightChange(e, 3, "beforeWeight")}
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Item 1 Name"
                      value={processData[3].item1Name}
                      onChange={(e) => handleWeightChange(e, 3, "item1Name")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Item 1 Weight"
                      value={processData[3].item1Weight}
                      onChange={(e) => handleWeightChange(e, 3, "item1Weight")}
                      fullWidth
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Item 2 Name"
                      value={processData[3].item2Name}
                      onChange={(e) => handleWeightChange(e, 3, "item2Name")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Item 2 Weight"
                      value={processData[3].item2Weight}
                      onChange={(e) => handleWeightChange(e, 3, "item2Weight")}
                      fullWidth
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                  </Grid>
                </Grid>
              </div>
            )}

            {activeStep > 3 && activeStep < steps.length && (
              <div>
                <TextField
                  label="Enter Before Weight"
                  value={processData[activeStep].beforeWeight}
                  onChange={(e) =>
                    handleWeightChange(e, activeStep, "beforeWeight")
                  }
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <TextField
                  label="Enter After Weight"
                  value={processData[activeStep].afterWeight}
                  onChange={(e) =>
                    handleWeightChange(e, activeStep, "afterWeight")
                  }
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                {processData[activeStep].difference !== null && (
                  <Typography variant="body1">
                    Weight Difference: {processData[activeStep].difference}
                  </Typography>
                )}
              </div>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{ marginTop: "10px", marginRight: "10px" }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              style={{ marginTop: "10px" }}
            >
              Back
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              style={{ marginTop: "60px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Process;


