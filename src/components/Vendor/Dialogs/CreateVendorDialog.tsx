import {
  Box,
  Dialog,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  CreateVendorPageOne,
  CreateVendorPageTwo,
  CreateVendorPageThree,
  CreateVendorPageSuccess,
} from '../Create/CreateNewVendorForm';

interface CreateVendorDialogProps {
  isCreateVendorDialogOpen: boolean;
  setIsCreateVendorDialogOpen: any;
}

export const CreateVendorDialog: React.FC<CreateVendorDialogProps> = ({
  isCreateVendorDialogOpen,
  setIsCreateVendorDialogOpen,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = ['Vendor Info', 'Menu', 'Schedule'];

  const handleNext = (): void => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = (): void => {
    if (activeStep === 0) return;
    setActiveStep(prevStep => prevStep - 1);
  };
  const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 80vh;
  `;

  return (
    <Dialog
      open={isCreateVendorDialogOpen}
      onClose={() => setIsCreateVendorDialogOpen(false)}
    >
      <DialogContent>
        <Wrapper>
          <Box>
            <Stepper
              sx={{ mt: 4, width: '80%', marginInline: 'auto' }}
              activeStep={activeStep}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <CreateVendorPageOne handleNext={handleNext} />
            )}

            {activeStep === 1 && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CreateVendorPageTwo
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </motion.div>
            )}
            {activeStep === 2 && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CreateVendorPageThree
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </motion.div>
            )}
            {activeStep === 3 && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CreateVendorPageSuccess />
              </motion.div>
            )}
          </Box>
        </Wrapper>
      </DialogContent>
    </Dialog>
  );
};
