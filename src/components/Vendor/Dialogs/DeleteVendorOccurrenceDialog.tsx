import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
interface DeleteVendorOccurrenceDialogProps {
  isDeleteOccurenceDialogOpen: boolean;
  setIsDeleteOccurenceDialogOpen: any;
  occurrenceIndex: number;
}

export const DeleteVendorOccurrenceDialog: React.FC<
  DeleteVendorOccurrenceDialogProps
> = ({
  isDeleteOccurenceDialogOpen,
  setIsDeleteOccurenceDialogOpen,
  occurrenceIndex,
}) => {
  return (
    <Dialog
      open={isDeleteOccurenceDialogOpen}
      onClose={() => setIsDeleteOccurenceDialogOpen(false)}
    >
      <DialogContent>
        <Typography variant='h6'>
          Are you sure you want to delete Occurrence {occurrenceIndex + 1}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button>Yes</Button>
        <Button onClick={() => setIsDeleteOccurenceDialogOpen(false)}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
