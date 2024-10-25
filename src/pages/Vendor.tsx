import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress, Paper } from '@mui/material';
import IMenuItem from '../shared/interfaces/menu-item';
import { VendorContext } from '../context/VendorContext';
import { useNavigate, useParams } from 'react-router-dom';
import ILocation from '../shared/interfaces/location';
import EditModeButton from '../components/Vendor/EditModeButton';
import {
  EditMenuItemCard,
  VendorInfoGridItem,
  VendorLocationTextField,
  VendorInfoGridTextField,
} from '../components/Vendor/VendorPage.components';
import { LoginContext } from '../context/LoginContext';
import { RoutePaths } from '../bind-routes';
import VendorMenu from '../components/Vendor/VendorMenu';
import { DeleteVendorDialog } from '../components/Vendor/Dialogs/DeleteVendorDialog';
import { VendorSchedule } from '../components/Vendor/VendorSchedule';

const DisplayVendorInfo: React.FC = () => {
  const {
    onChangeHandler,
    sortedEntries,
    initializeUneditedState,
    uneditedState,
    headerMapping,
    setEditedState,
    isFetching,
    isEditing,
    addressOnChangeHandler,
    vendor,
  } = useContext(VendorContext);

  useEffect(() => {
    initializeUneditedState();
    // spam calls initializeUneditedState if we fill the dependency array with initializeUneditedState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setEditedState(uneditedState);
    // spam calls setEditedState if we fill the dependency array with setEditedState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uneditedState]);

  const [menuItemList, setMenuItemList] = useState<IMenuItem[]>(
    vendor?.menu || []
  );

  const categoryMappings = {
    menu: (menu: any) => (
      <VendorMenu
        menuItemList={menuItemList}
        setMenuItemList={setMenuItemList}
      />
    ),
    _id: (id: string) => (
      <Grid justifyContent='center' item xs={12}>
        <Typography
          variant='subtitle1'
          sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
        >
          ID
        </Typography>
        <Typography>{id}</Typography>
      </Grid>
    ),
    location: (location: ILocation) => (
      <Grid justifyContent='center' item xs={12}>
        {location &&
          location.address &&
          Object.entries(location.address).map(
            ([subCategory, value]: [string, any]) => {
              if (subCategory === '_id') return;
              return (
                <Grid justifyContent='center' item xs={12}>
                  <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                  >
                    {subCategory}
                  </Typography>
                  <Typography>{value}</Typography>
                </Grid>
              );
            }
          )}
      </Grid>
    ),
    schedule: (schedule: any) => (
      <VendorSchedule schedule={schedule}></VendorSchedule>
    ),
  };

  interface RenderCategoryProps {
    categoryKey: string;
    value: any;
  }

  const renderCategory: React.FC<RenderCategoryProps> = ({
    categoryKey,
    value,
  }) => {
    const categoryMapping = (categoryMappings as { [key: string]: any })[
      categoryKey
    ];
    if (categoryMapping && typeof categoryMapping === 'function') {
      return categoryMapping(value);
    }
    return (
      <VendorInfoGridItem
        key={categoryKey}
        headerName={
          headerMapping[categoryKey] ||
          categoryKey.substring(0, 1).toUpperCase() + categoryKey.substring(1)
        }
        value={String(value)}
      />
    );
  };

  const categoryEditingMappings = {
    menu: () => {
      return (
        <>
          <Grid justifyContent='center' alignSelf='self-end' item xs={12}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              menu
            </Typography>
          </Grid>
          {menuItemList.map((menuItem: IMenuItem, index: number) => (
            <EditMenuItemCard key={menuItem._id} index={index} />
          ))}
        </>
      );
    },
    _id: (value: any) => (
      <Grid justifyContent='center' item xs={12}>
        <Typography
          variant='subtitle1'
          sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
        >
          ID
        </Typography>
        <Typography>{value}</Typography>
      </Grid>
    ),
    location: (location: ILocation) => (
      <Grid justifyContent='center' item xs={12}>
        {location &&
          location.address &&
          Object.entries(location.address).map(
            ([subCategory]: [string, any]) => {
              if (subCategory === '_id') return;
              if (subCategory === 'country') return;
              return (
                <VendorLocationTextField
                  subCategory={subCategory}
                  onChangeHandler={(event: any) =>
                    addressOnChangeHandler(event)
                  }
                />
              );
            }
          )}
      </Grid>
    ),
  };

  const renderEditingCategory: React.FC<RenderCategoryProps> = ({
    categoryKey,
    value,
  }) => {
    if (categoryKey === 'schedule') return;
    const categoryEditMapping = (
      categoryEditingMappings as { [key: string]: any }
    )[categoryKey];

    if (categoryEditMapping && typeof categoryEditMapping === 'function') {
      return categoryEditMapping(value);
    }
    return (
      <VendorInfoGridTextField
        fieldKey={categoryKey}
        onChangeHandler={onChangeHandler}
      />
    );
  };

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '80%', md: '75%', lg: '60%' },
        margin: '10px auto',
      }}
    >
      <Grid container justifyContent='flex-start' spacing={2}>
        {!isFetching && <EditModeButton />}
        {isEditing
          ? sortedEntries.map(([categoryKey, value]) => {
              return renderEditingCategory({ categoryKey, value });
            })
          : sortedEntries.map(([categoryKey, value]) => {
              return renderCategory({ categoryKey, value });
            })}
        <DeleteVendorDialog />
      </Grid>
    </Box>
  );
};

const VendorPage = () => {
  const { error, fetchVendor, isFetching } = useContext(VendorContext);
  const { vendorID } = useParams();
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RoutePaths.login);
    }

    if (!isFetching && vendorID) {
      fetchVendor(vendorID);
    }
    // will spam the endpoint if you place fetchVendor in the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoggedIn() && (
        <Box>
          {isFetching ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DisplayVendorInfo key={vendorID} />
          )}

          {error && (
            <Paper
              sx={{
                margin: '20px 0',
                padding: '20px',
                backgroundColor: '#f8d7da',
                borderRadius: '4px',
              }}
            >
              <Typography variant='subtitle1' color='error'>
                Error:
              </Typography>
              <Typography variant='body1'>{error}</Typography>
            </Paper>
          )}
        </Box>
      )}
    </>
  );
};

export default VendorPage;
