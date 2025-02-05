import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from "@mui/material";

function Process() {
  const [activeStep, setActiveStep] = useState(0);

 
  const [processData, setProcessData] = useState([
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
    { beforeWeight: "", afterWeight: "", difference: null },
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
    if (activeStep > 0) {
      const before = parseFloat(updatedData[activeStep].beforeWeight);
      const after = parseFloat(updatedData[activeStep].afterWeight);
      updatedData[activeStep].difference = before - after;
    }

   
    if (activeStep < 6) {
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
              <div>
                <TextField
                  label="Enter Gold Weight"
                  value={processData[0].beforeWeight}
                  onChange={(e) => handleWeightChange(e, 0, "beforeWeight")}
                  fullWidth
                  margin="normal"
                  type="number"
                />
              </div>
            )}

            {activeStep > 0 && activeStep < 6 && (
              <div>
                <TextField
                  label={`Enter Before Weight for Melting Process`}
                  value={processData[activeStep].beforeWeight}
                  onChange={(e) =>
                    handleWeightChange(e, activeStep, "beforeWeight")
                  }
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label={`Enter After Weight for Melting Process`}
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
              disabled={activeStep === 0 && processData[0].beforeWeight === ""}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
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
