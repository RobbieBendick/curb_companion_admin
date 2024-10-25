import { Box, Button, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { VendorContext } from '../../context/VendorContext';

const EditModeButton: React.FC = ({}) => {
  const { vendorID } = useParams();
  const { isEditing, setIsEditing, handleCancelChanges, handleSaveChanges } =
    useContext(VendorContext);

  return (
    <Grid item sx={{ ml: 'auto' }}>
      {!isEditing ? (
        <Button
          variant='contained'
          color='primary'
          onClick={() => setIsEditing(true)}
        >
          Enter Edit Mode
        </Button>
      ) : (
        <Box display='flex' flexDirection='row' gap='5px'>
          <Button
            variant='contained'
            color='primary'
            onClick={event => {
              if (vendorID) {
                handleSaveChanges(vendorID);
              }
            }}
          >
            Save Changes
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={event => {
              handleCancelChanges(event);
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default EditModeButton;
