import {
  Grid,
  Card,
  CardContent,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { VendorContext } from '../../context/VendorContext';
import IMenuItem from '../../shared/interfaces/menu-item';
import { Delete } from '@mui/icons-material';

interface VendorMenuItemCardsProps {
  menuItemList: IMenuItem[];
  openDeleteMenuItemDialog: any;
}
export const VendorMenuItemCards: React.FC<VendorMenuItemCardsProps> = ({
  menuItemList,
  openDeleteMenuItemDialog,
}) => {
  const { isEditing } = useContext(VendorContext);
  return (
    <Grid container spacing={2}>
      {!isEditing &&
        menuItemList.map((menuItem: IMenuItem) => (
          <Grid item xs={12} sm={6} md={4} key={menuItem.title}>
            <Card>
              <CardContent sx={{ position: 'relative' }}>
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => openDeleteMenuItemDialog(menuItem)}
                >
                  <Delete />
                </IconButton>
                <Typography variant='h6'>{menuItem.title}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {menuItem.description}
                </Typography>
                <Typography variant='body1' sx={{ marginTop: 2 }}>
                  Price: ${menuItem.price}
                </Typography>
                <Typography variant='body1'>Type: {menuItem.type}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

interface EditMenuItemCardProps {
  index: number;
}

export const EditMenuItemCard: React.FC<EditMenuItemCardProps> = ({
  index,
}) => {
  const { setEditedState, editedState } = useContext(VendorContext);

  const onMenuItemChangeHandler = (event: any) => {
    setEditedState((prevState: any) => {
      const updatedMenu = [...(prevState.menu || [])];

      // update the specific menu item
      updatedMenu[index] = {
        ...updatedMenu[index],
        [event.target.name]: event.target.value,
      };

      return {
        ...prevState,
        menu: updatedMenu,
      };
    });
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <InputLabel htmlFor='title'>Title</InputLabel>
          <TextField
            value={editedState?.menu && editedState?.menu[index].title}
            variant='outlined'
            fullWidth
            name='title'
            onChange={event => onMenuItemChangeHandler(event)}
          />
          <InputLabel htmlFor='description'>Description</InputLabel>
          <TextField
            value={editedState?.menu && editedState?.menu[index].description}
            variant='outlined'
            fullWidth
            name='description'
            minRows={4}
            multiline
            onChange={event => onMenuItemChangeHandler(event)}
          />
          <InputLabel htmlFor='price'>Price</InputLabel>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
            value={editedState?.menu && editedState?.menu[index].price}
            variant='outlined'
            fullWidth
            name='price'
            onChange={event => onMenuItemChangeHandler(event)}
          />
          <InputLabel htmlFor='type'>Type</InputLabel>
          <TextField
            value={editedState?.menu && editedState?.menu[index].type}
            variant='outlined'
            fullWidth
            name='type'
            onChange={event => onMenuItemChangeHandler(event)}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

interface VendorInfoGridItemProps {
  headerName: string;
  value: string;
}

export const VendorInfoGridItem: React.FC<VendorInfoGridItemProps> = ({
  headerName,
  value,
}) => {
  return (
    <Grid justifyContent='center' item xs={12}>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
      >
        {headerName}
      </Typography>
      <Typography variant='body1' sx={{ fontSize: '1.1rem' }}>
        {value || 'N/A'}
      </Typography>
    </Grid>
  );
};

interface VendorLocationTextFieldProps {
  subCategory: string;
  onChangeHandler: any;
}

export const VendorLocationTextField: React.FC<
  VendorLocationTextFieldProps
> = ({ subCategory, onChangeHandler }) => {
  const { editedState } = useContext(VendorContext);
  return (
    <Grid justifyContent='center' item xs={12}>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
      >
        {subCategory}
      </Typography>
      <TextField
        name={subCategory}
        key={subCategory}
        value={(editedState as any).location.address[subCategory]}
        sx={{ width: '100%' }}
        onChange={onChangeHandler}
      />
    </Grid>
  );
};

interface VendorInfoGridTextFieldProps {
  fieldKey: string;
  onChangeHandler: any;
}

export const VendorInfoGridTextField: React.FC<
  VendorInfoGridTextFieldProps
> = ({ fieldKey, onChangeHandler }) => {
  const { editedState } = useContext(VendorContext);
  return (
    <Grid justifyContent='center' item xs={12}>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
      >
        {fieldKey}
      </Typography>
      <TextField
        name={fieldKey}
        key={fieldKey}
        value={(editedState as any)[fieldKey]}
        sx={{ width: '100%' }}
        onChange={onChangeHandler}
      />
    </Grid>
  );
};
