import { ArrowRight, ArrowLeft } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import React from 'react';
import { VendorContext } from '../../context/VendorContext';

export function SkipGoBack({
  handleNext,
  handleBack,
  sendApiCall = false,
}: {
  handleNext?: () => void;
  handleBack?: () => void;
  sendApiCall?: boolean;
}) {
  const { newVendor, setNewVendor } = useContext(VendorContext);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleApiCall = async () => {
    if (!handleNext) return;

    if (sendApiCall) {
      try {
        const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
          import.meta.env.VITE_BACKEND_PORT
        }/api/landing/create`;
        const res = await axios.post(url, newVendor);
        if (res.status >= 200 && res.status < 300) {
          handleNext();
        }
      } catch (error: any) {
        console.log('ERROR:', error);
        setErrorMessage(error.message);
      }
      return;
    } else {
      handleNext();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
      }}
    >
      {errorMessage && (
        <Box sx={{ mt: 1.5, marginInline: 'auto', color: 'red' }}>
          <Typography textAlign='center'>{errorMessage}</Typography>
        </Box>
      )}
      {handleNext && (
        <Link
          sx={{
            mt: 1.5,
            marginInline: 'auto',
            cursor: 'pointer',
            flexDirection: 'row',
            display: 'flex',
          }}
          onClick={handleApiCall}
        >
          Skip
          <ArrowRight />
        </Link>
      )}
      {handleBack && (
        <Link
          sx={{
            mt: 1.5,
            marginInline: 'auto',
            cursor: 'pointer',
            flexDirection: 'row',
            display: 'flex',
          }}
          onClick={handleBack}
        >
          <ArrowLeft />
          Go Back
        </Link>
      )}
    </Box>
  );
}
