import React from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  InputLabel,
} from '@mui/material';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
interface CreateUserFormProps {
  setIsCreateUserDialogOpen: any;
  isCreateUserDialogOpen: boolean;
}
export const CreateUserDialog: React.FC<CreateUserFormProps> = ({
  isCreateUserDialogOpen,
  setIsCreateUserDialogOpen,
}) => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    surname: '',
    dateOfBirth: '',
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const createUserSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    firstName: Yup.string().required('First Name is required'),
    surname: Yup.string().required('Surname is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createUserSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog
      open={isCreateUserDialogOpen}
      onClose={() => setIsCreateUserDialogOpen(false)}
    >
      <DialogContent>
        <Typography
          variant='h6'
          fontWeight='bold'
          fontSize='1.65rem'
          align='center'
          mb={1.5}
        >
          Create New User
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Email'
                name='email'
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                name='password'
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Confirm Password'
                name='confirmPassword'
                fullWidth
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='First Name'
                name='firstName'
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Surname'
                name='surname'
                fullWidth
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Date of Birth</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type='submit'>
                Create User
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
