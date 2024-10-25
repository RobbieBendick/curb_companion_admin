import { Snackbar, SnackbarCloseReason, SnackbarContent } from '@mui/material';
import React from 'react';
import { SyntheticEvent } from 'react';

interface CustomSnackbarProps {
  message: string;
  isOpen: boolean;
  hasError?: boolean;
  setIsSnackbarOpen: any;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  isOpen,
  hasError = false,
  setIsSnackbarOpen,
}) => {
  const closeSnackbar = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={closeSnackbar}>
      <SnackbarContent
        sx={{ backgroundColor: hasError ? 'red' : 'green' }}
        message={message}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
