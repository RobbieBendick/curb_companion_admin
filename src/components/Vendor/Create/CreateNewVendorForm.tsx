import React, { useContext, useEffect, useState } from 'react';
import { VendorContext } from '../../../context/VendorContext';
import { MultiSelectTags } from '../TagSelect';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  styled,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Delete } from '@mui/icons-material';
import { SkipGoBack } from '../SkipGoBack';
import axios from 'axios';
import { StateDropdown } from '../StateDropdown';
import { MultiSelectDays } from '../DaySelect';
import { SelectedSchedule } from '../SelectedSchedule';

interface IBasicVendorFormValues {
  title: string;
  tags: string[];
  street: string;
  city: string;
  state: string;
  postalCode: string;
  catering: boolean;
  website: string;
  phoneNumber: string;
}

export function CreateVendorPageOne({
  handleNext,
}: {
  handleNext: () => void;
}): React.ReactElement {
  const { newVendor, setNewVendor } = useContext(VendorContext);
  const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
    import.meta.env.VITE_BACKEND_PORT
  }/api/tags`;

  interface ITag {
    id: string;
    title: string;
    image: any;
  }

  const [tags, setTags] = useState<ITag[]>([]);
  useEffect(() => {
    if (tags.length > 0) return;
    const fetchTags = async () => {
      try {
        const response = await axios.get(url);
        const tagList: ITag[] = response.data.data;
        setTags(tagList);
      } catch (error) {
        console.error('Error fetching tags', error);
      }
    };

    // Fetch tags on page load
    fetchTags();
  }, []);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    tags: yup.array().of(yup.string()).optional(),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    postalCode: yup.string().required('Postal Code is required'),
    website: yup.string().optional(),
    phoneNumber: yup
      .string()
      .max(10, 'Phone number cannot exceed 10 digits')
      .min(10, 'Phone numer cannot be less than 10 digits')
      .optional(),
  });

  const handleBasicVendorFormSubmit = async (
    values: IBasicVendorFormValues
  ) => {
    setNewVendor({
      ...newVendor,
      title: values.title,
      tags: values.tags,
      street: values.street,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      phoneNumber: values.phoneNumber,
      website: values.website,
      catering: values.catering,
    });
    console.log('newVendor', newVendor);
    handleNext();
  };
  const initialValues: IBasicVendorFormValues = {
    title: '',
    tags: [],
    street: '',
    city: '',
    state: '',
    postalCode: '',
    catering: false,
    website: '',
    phoneNumber: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleBasicVendorFormSubmit,
  });

  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Box
        sx={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, mt: 2 }}
        >
          Create your vendor
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
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
            <MultiSelectTags formik={formik} tagTitleList={tags} />
            <Grid item xs={12}>
              <TextField
                label='Phone Number'
                name='phoneNumber'
                fullWidth
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Website'
                name='website'
                fullWidth
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Street'
                name='street'
                fullWidth
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label='City'
                name='city'
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StateDropdown
                formik={formik} // Pass formik context to StateDropdown
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label='Postal Code'
                name='postalCode'
                fullWidth
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.postalCode && Boolean(formik.errors.postalCode)
                }
                helperText={
                  formik.touched.postalCode && formik.errors.postalCode
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='catering'
                    checked={formik.values.catering}
                    onChange={formik.handleChange}
                  />
                }
                label='Your vendor offers catering'
              />
            </Grid>

            {errorMessage && (
              <Typography
                sx={{
                  display: 'block',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {errorMessage}
              </Typography>
            )}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ paddingLeft: 0 }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export function CreateVendorPageTwo({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}): React.ReactElement {
  interface MenuItem {
    title: string;
    description: string;
    price: string;
    type: string;
  }
  const StyledMenuItemCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 1rem;
    height: 15rem;
    position: relative;
    width: 17rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-5px);
    }

    .content {
      flex-grow: 1;
    }

    .title {
      max-width: 13rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.5rem;
    }

    .description {
      display: -webkit-box;
      -webkit-line-clamp: 4; // limit lines to 4
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-wrap: break-word;
    }
    .type {
      position: absolute;
      bottom: 1rem;
      right: 1.5rem;
    }

    .price {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      font-style: italic;
    }

    .delete {
      position: absolute;
      top: 0.8rem;
      right: 0.7rem;
    }
  `;
  const [menuItemList, setMenuItemList] = useState<MenuItem[]>([]);

  const { newVendor, setNewVendor } = useContext(VendorContext);

  function MenuItemCard({
    menuItem,
    index,
  }: {
    menuItem: MenuItem;
    index: number;
  }) {
    const handleDeleteMenuItem = (idx: number) => {
      const updatedList = menuItemList.filter((_, i) => i !== idx);
      setMenuItemList(updatedList);
    };

    const [
      isDeleteNewVendorMenuItemDialogOpen,
      setIsDeleteNewVendorMenuItemDialogOpen,
    ] = useState<boolean>(false);

    const handleDeleteOnClick = () => {
      setIsDeleteNewVendorMenuItemDialogOpen(true);
    };
    return (
      <StyledMenuItemCard>
        <div className='content'>
          <Typography variant='h6' className='title'>
            {menuItem.title}
          </Typography>
          <Typography className='description'>
            {menuItem.description || 'No description provided.'}
          </Typography>
        </div>
        <Typography
          variant='body1'
          className='type'
        >{`${menuItem.type}`}</Typography>
        <Typography variant='body1' className='price'>
          {menuItem.price ? `$${menuItem.price}` : ''}
        </Typography>
        <IconButton className='delete'>
          <Delete onClick={() => handleDeleteOnClick()} />
        </IconButton>
        <Dialog
          open={isDeleteNewVendorMenuItemDialogOpen}
          onClose={() => setIsDeleteNewVendorMenuItemDialogOpen(false)}
        >
          <DialogContent>
            <Typography variant='h6'>
              Are you sure you want to delete {menuItem.title}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDeleteMenuItem(index)}>Yes</Button>
            <Button
              onClick={() => setIsDeleteNewVendorMenuItemDialogOpen(false)}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </StyledMenuItemCard>
    );
  }

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

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      type: '',
    },
    validationSchema: validationSchema,
    onSubmit: (item: MenuItem): void => {
      // add menu item to list
      setMenuItemList((prevList: MenuItem[]) => [...prevList, item]);

      // reset form
      formik.resetForm();
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, pt: 2 }}
      >
        Create your menu
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
            <SkipGoBack handleNext={handleNext} handleBack={handleBack} />
          </Grid>
        </form>
      </Box>
      {menuItemList.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography
            variant='h5'
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, mt: 5 }}
          >
            Menu Items
          </Typography>
          <Grid container sx={{ gap: '2rem', justifyContent: 'center' }}>
            {menuItemList.map((menuItem: MenuItem, index: number) => (
              <MenuItemCard menuItem={menuItem} index={index} />
            ))}
          </Grid>
        </Box>
      )}
      {menuItemList.length > 0 && (
        <Grid
          container
          sx={{ maxWidth: '60vh', marginInline: 'auto', mt: 5.5, mb: 4 }}
        >
          <Grid item xs={12} sx={{ display: 'grid' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={async () => {
                // set vendor's menu
                setNewVendor({
                  ...newVendor,
                  menu: menuItemList,
                });

                handleNext();
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export function CreateVendorPageThree({
  handleNext,
  handleBack,
}: {
  handleBack: () => void;
  handleNext: () => void;
}): React.ReactElement {
  interface ScheduleItem {
    days: string[];
    startTime: string | null;
    endTime: string | null;
  }
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem[]>([]); // [[startHour, startMinute], [endHour, endMinute]]  MILLITARY TIME

  const validationSchema = yup.object({
    days: yup.array().min(1, 'At least one day must be selected'),
    startTime: yup.string().required('Start time is required'),
    endTime: yup.string().required('End time is required'),
  });

  const formik = useFormik({
    initialValues: {
      days: [],
      startTime: null,
      endTime: null,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setSelectedSchedule([
        ...selectedSchedule,
        {
          days: formik.values.days,
          startTime: formik.values.startTime,
          endTime: formik.values.endTime,
        },
      ]);
      formik.resetForm();
    },
  });

  const { newVendor, setNewVendor } = useContext(VendorContext);

  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <Box sx={{ minHeight: '85vh' }}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '35%',
            margin: '0 auto',
            maxWidth: '30rem',
            padding: '0 1rem',
          }}
        >
          <Typography
            variant='h4'
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, mt: 8 }}
          >
            Create your schedule
          </Typography>

          {/* Day(s) input field */}
          <MultiSelectDays formik={formik} />

          <Button
            sx={{ backgroundColor: '#0ea47a', color: '#fff', mt: 2 }}
            type='submit'
          >
            Add to schedule
          </Button>
          <SkipGoBack
            handleNext={handleNext}
            handleBack={handleBack}
            sendApiCall={true}
          />
        </Box>
      </form>
      <SelectedSchedule
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
      />
      {selectedSchedule.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5,
            mb: 4,
            flexDirection: 'column',
            minWidth: '35%',
            margin: '0 auto',
            maxWidth: '30rem',
            padding: '1rem 1rem',
          }}
        >
          <Button
            sx={{ backgroundColor: '#0ea47a', color: '#fff', mt: 5 }}
            onClick={async () => {
              try {
                const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
                  import.meta.env.VITE_BACKEND_PORT
                }/api/landing/create`;

                const updatedNewVendor = {
                  ...newVendor,
                  schedule: selectedSchedule,
                };
                const res = await axios.post(url, updatedNewVendor);
                if (res.status >= 200 && res.status < 300) {
                  handleNext();
                }
              } catch (error: any) {
                setErrorMessage(error.message.message);
              }
            }}
          >
            Continue
          </Button>
          {errorMessage && (
            <Typography
              sx={{
                display: 'block',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export function CreateVendorPageSuccess() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        textAlign={'center'}
        variant='h4'
        sx={{
          mt: 5,
        }}
      >
        Success!
      </Typography>
      <Typography
        variant='h5'
        textAlign={'center'}
        sx={{
          mt: 1,
        }}
      >
        Your vendor has been sent for review.
      </Typography>
      <Button
        sx={{
          mt: 1.9,
          marginInline: 'auto',
          backgroundColor: '#0ea47a',
          color: '#fff',
        }}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
