
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

function Process() {
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
    if (activeStep === 0 && processData[0].beforeWeight === "") {
      alert("Please enter the gold weight.");
      return;
    }
    if (
      activeStep === 1 &&
      (processData[1].beforeWeight === "" || processData[1].afterWeight === "")
    ) {
      alert("Please enter both before and after weight.");
      return;
    }

    const updatedData = [...processData];
    if (activeStep > 0 && activeStep !== 3) {
      const before = parseFloat(updatedData[activeStep].beforeWeight);
      const after = parseFloat(updatedData[activeStep].afterWeight);
      updatedData[activeStep].difference = before - after;
    }

    if (activeStep === 3) {
      const totalWeight = parseFloat(updatedData[3].beforeWeight);
      const item1Weight = parseFloat(updatedData[3].item1Weight);
      const item2Weight = parseFloat(updatedData[3].item2Weight);

      if (item1Weight + item2Weight !== totalWeight) {
        alert("The sum of item weights must equal the total weight.");
        return;
      }

      updatedData[4].beforeWeight = item1Weight;
      updatedData[5].beforeWeight = item2Weight;
    }

    if (activeStep < steps.length - 1 && activeStep !== 3) {
      updatedData[activeStep + 1].beforeWeight =
        updatedData[activeStep].afterWeight;
    }

    setProcessData(updatedData);
    setActiveStep(activeStep + 1);
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Process;


