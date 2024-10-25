import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { VendorContext } from '../../../context/VendorContext';
import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { Delete, Warning } from '@mui/icons-material';
import React from 'react';
export const DeleteVendorDialog = () => {
  const { vendorID } = useParams();
  const [isWillingToDeleteVendor, setIsWillingToDeleteVendor] =
    useState<boolean>(false);
  const [isDeleteVendorDialogOpen, setIsDeleteVendorDialogOpen] =
    useState<boolean>(false);
  const { vendor, deleteVendor } = useContext(VendorContext);

  const closeDeleteVendorDialog = () => {
    setIsDeleteVendorDialogOpen(false);

    // don't want the user to see this switch
    setTimeout(() => {
      setIsWillingToDeleteVendor(false);
    }, 1000 * 0.15);
  };

  return (
    <>
      <Dialog open={isDeleteVendorDialogOpen} onClose={closeDeleteVendorDialog}>
        {!isWillingToDeleteVendor ? (
          <>
            <DialogContent>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'semi-bold', textAlign: 'center' }}
              >
                Are you sure you want to delete {vendor?.title}?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ display: 'flex' }}>
              <Button
                onClick={() => {
                  setIsWillingToDeleteVendor(true);
                }}
                color='primary'
              >
                Yes
              </Button>
              <Button
                onClick={closeDeleteVendorDialog}
                color='primary'
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <Box
                sx={{
                  borderRadius: '14px',
                  backgroundColor: 'yellow',
                  minHeight: '30px',
                  padding: '9px',
                  textAlign: 'center',
                }}
              >
                <Warning />
                <Typography component='p'>
                  Doing this will permanently remove {vendor?.title} from the
                  database.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex' }}>
              <Button
                onClick={() => {
                  deleteVendor(vendorID);
                  closeDeleteVendorDialog();
                }}
                color='primary'
              >
                I have read and understand these effects
              </Button>
              <Button
                onClick={closeDeleteVendorDialog}
                color='primary'
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Grid item>
        <Button
          variant='contained'
          onClick={() => setIsDeleteVendorDialogOpen(true)}
        >
          <Delete sx={{ mr: 0.35 }} />
          Delete This Vendor
        </Button>
      </Grid>
    </>
  );
};
