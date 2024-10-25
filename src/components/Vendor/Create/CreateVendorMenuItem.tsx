import {
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { VendorContext } from '../../../context/VendorContext';
import CustomSnackbar from '../../Snackbar';

export function CreateVendorMenuItem(): React.ReactElement {
  const { vendorID } = useParams();

  const foodTypes: string[] = [
    'Entree',
    'Combo',
    'Side',
    'Appetizer',
    'Drink',
    'Dessert',
  ];
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    price: yup
      .string()
      .matches(/^\d+(\.\d{1,2})?$/, 'Please enter a valid price')
      .optional(),
    type: yup.string().required('Type is required'),
  });
  const { addMenuItem } = useContext(VendorContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      type: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const newMenuItem = {
        title: formik.values.title,
        description: formik.values.description,
        price: formik.values.price,
        type: formik.values.type,
      };
      addMenuItem(newMenuItem, formik, vendorID);
    },
  });

  return (
    <>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, pt: 2 }}
      >
        Create your menu item
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '60vh',
          margin: '0 auto',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
            <CustomSnackbar
              isOpen={isSnackbarOpen}
              message={snackbarMessage}
              setIsSnackbarOpen={setIsSnackbarOpen}
            />
            <Grid item xs={12}>
              <TextField
                label='Title'
                name='title'
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Description'
                name='description'
                fullWidth
                multiline={true}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                label='Price'
                name='price'
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label='Type'
                name='type'
                fullWidth
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                {foodTypes.map((type: string) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ display: 'grid' }}>
              <Button variant='contained' color='primary' type='submit'>
                Add Menu Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
