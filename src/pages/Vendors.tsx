import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useMediaQuery } from '@react-hook/media-query';
import IVendor from '../shared/interfaces/vendor';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { RoutePaths } from '../bind-routes';
import { CreateVendorDialog } from '../components/Vendor/Dialogs/CreateVendorDialog';

export default function VendorsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCreateVendorDialogOpen, setisCreateVendorDialogOpen] =
    useState<boolean>(false);

  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'location',
      headerName: 'Location',
      flex: 2,
      valueGetter: params => {
        if (!params.row.location) return;
        const { street, state } = params.row.location.address;
        return `${street}, ${state}`;
      },
    },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 2 },
  ];

  const fetchAllVendors = async () => {
    setIsFetching(true);

    try {
      const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/vendors/search`;
      const response = await axios.get(url);
      const newVendors: IVendor[] = response.data.data;

      setVendors(newVendors);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const getRowId = (row: any) => row._id;

  const handleOnRowClick = (params: GridRowParams) => {
    const vendorID = params.row._id;
    navigate(`/vendor/${vendorID}`);
  };

  // Fetch all vendors on page load
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RoutePaths.login);
    }
    fetchAllVendors();
  }, []);

  return (
    <>
      {isLoggedIn() && (
        <Box sx={{ height: 800, width: '80%', marginInline: 'auto' }}>
          <Typography
            component='h3'
            textAlign='center'
            sx={{ marginBlock: 2, fontSize: '2rem', fontWeight: 'bold' }}
          >
            Vendors
          </Typography>
          {isFetching ? (
            <Typography textAlign='center'>Loading...</Typography>
          ) : (
            <Grid container justifyContent='flex-end' spacing={2}>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setisCreateVendorDialogOpen(true)}
                >
                  Create New Vendor
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  rows={vendors}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 15 },
                    },
                  }}
                  pageSizeOptions={[15, 30, 50]}
                  getRowId={getRowId}
                  onRowClick={handleOnRowClick}
                />
              </Grid>
            </Grid>
          )}

          {/* Add vendor button on mobile */}
          {isMobile && (
            <IconButton
              sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBlock: 1 }}
              color='primary'
            >
              <AddCircle />
            </IconButton>
          )}
          <CreateVendorDialog
            isCreateVendorDialogOpen={isCreateVendorDialogOpen}
            setIsCreateVendorDialogOpen={setisCreateVendorDialogOpen}
          />
        </Box>
      )}
    </>
  );
}
