import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

interface CreateUserDialogProps {
  isCreateUserDialogOpen: boolean;
  setIsCreateUserDialogOpen: any;
}

export const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  isCreateUserDialogOpen,
  setIsCreateUserDialogOpen,
}) => {
  return (
    <Dialog
      open={isCreateUserDialogOpen}
      onClose={() => setIsCreateUserDialogOpen(false)}
    >
      <DialogContent></DialogContent>
    </Dialog>
  );
};
