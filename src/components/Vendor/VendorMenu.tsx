import { AddCircle } from '@mui/icons-material';
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteMenuItemDialog from './Dialogs/DeleteMenuItemDialog';
import IMenuItem from '../../shared/interfaces/menu-item';
import { VendorMenuItemCards } from './VendorPage.components';
import { CreateVendorMenuItem } from './Create/CreateVendorMenuItem';

interface VendorMenuProps {
  menuItemList: any;
  setMenuItemList: any;
}
const VendorMenu: React.FC<VendorMenuProps> = ({
  menuItemList,
  setMenuItemList,
}) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuItem | null>(
    null
  );
  const [isDeleteMenuItemDialogOpen, setIsDeleteMenuItemDialogOpen] =
    useState<boolean>(false);

  const openDeleteMenuItemDialog = (menuItem: IMenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsDeleteMenuItemDialogOpen(true);
  };

  const [isCreateMenuItemDialogOpen, setIsCreateMenuItemDialogOpen] =
    useState<boolean>(false);
  return (
    <Grid item spacing={-2} display='block'>
      <Grid item sx={{ marginBottom: 2.1 }}>
        <Box flexDirection='row' display='flex' justifyContent='space-between'>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
          >
            menu
          </Typography>
          <IconButton onClick={() => setIsCreateMenuItemDialogOpen(true)}>
            <AddCircle />
          </IconButton>
        </Box>
      </Grid>
      <DeleteMenuItemDialog
        isDeleteMenuItemDialogOpen={isDeleteMenuItemDialogOpen}
        setIsDeleteMenuItemDialogOpen={setIsDeleteMenuItemDialogOpen}
        selectedMenuItem={selectedMenuItem}
        setMenuItemList={setMenuItemList}
        menuItemList={menuItemList}
      />
      <Dialog
        open={isCreateMenuItemDialogOpen}
        onClose={() => setIsCreateMenuItemDialogOpen(false)}
      >
        <DialogContent>
          <CreateVendorMenuItem />
        </DialogContent>
      </Dialog>
      <VendorMenuItemCards
        menuItemList={menuItemList}
        openDeleteMenuItemDialog={openDeleteMenuItemDialog}
      />
    </Grid>
  );
};

export default VendorMenu;
