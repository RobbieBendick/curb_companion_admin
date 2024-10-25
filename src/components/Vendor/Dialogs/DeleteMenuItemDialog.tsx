import React, { useContext } from 'react';
import {
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Dialog,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import IMenuItem from '../../../shared/interfaces/menu-item';
import { VendorContext } from '../../../context/VendorContext';

interface DeleteMenuItemDialogProps {
  isDeleteMenuItemDialogOpen: any;
  setIsDeleteMenuItemDialogOpen: any;
  selectedMenuItem: IMenuItem | null;
  setMenuItemList: any;
  menuItemList: IMenuItem[];
}
const DeleteMenuItemDialog: React.FC<DeleteMenuItemDialogProps> = ({
  isDeleteMenuItemDialogOpen,
  setIsDeleteMenuItemDialogOpen,
  selectedMenuItem,
  setMenuItemList,
  menuItemList,
}) => {
  const { vendorID } = useParams();
  const { deleteMenuItem } = useContext(VendorContext);

  return (
    <Dialog
      open={isDeleteMenuItemDialogOpen}
      onClose={() => setIsDeleteMenuItemDialogOpen(false)}
    >
      <DialogContent>
        <Typography variant='h6'>
          Are you sure you want to delete {selectedMenuItem?.title}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={() =>
            deleteMenuItem(
              vendorID,
              selectedMenuItem,
              setIsDeleteMenuItemDialogOpen,
              setMenuItemList,
              menuItemList
            )
          }
        >
          Yes
        </Button>
        <Button
          onClick={() => setIsDeleteMenuItemDialogOpen(false)}
          color='primary'
          autoFocus
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMenuItemDialog;
