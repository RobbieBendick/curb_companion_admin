import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid, Typography } from '@mui/material';
import { LoginContext } from '../context/LoginContext';
import { RoutePaths } from '../bind-routes';
import { useNavigate } from 'react-router-dom';
import { CreateUserDialog } from '../components/User/Dialogs/CreateUserDialog';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isUserIDExpanded, setIsUserIDExpanded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleCellClick = () => {
    setIsUserIDExpanded(!isUserIDExpanded);
  };

  const ClickableCell: React.FC<ClickableCellProps> = ({ value, onClick }) => (
    <Box
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {value}
    </Box>
  );

  const columns: GridColDef[] = [
    { field: 'index', headerName: '#', width: 40 },
    {
      field: '_id',
      headerName: 'ID',
      width: isUserIDExpanded ? 220 : 65,
      renderCell: params => (
        <ClickableCell value={params.value} onClick={() => handleCellClick()} />
      ),
    },
    { field: 'firstName', headerName: 'First Name', width: 140 },
    { field: 'surname', headerName: 'Surname', width: 140 },
    {
      field: 'location',
      headerName: 'Location',
      width: 335,
      valueGetter: params => {
        if (!params.row.location) return;
        const { state, street } = params.row.location.address;
        return `${street}, ${state}`;
      },
    },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 140 },
    { field: 'email', headerName: 'Email', width: 260 },
    { field: 'verified', headerName: 'Verified', width: 75 },
    { field: 'roles', headerName: 'Role', width: 100 },
  ];

  const fetchAllUsers = async () => {
    setIsFetching(true);

    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_BACKEND_ADDR}:${
          import.meta.env.VITE_BACKEND_PORT
        }/api/users/`
      );
      const usersWithIndex = response.data.data
        .reverse()
        .map((user: any, index: number) => ({
          ...user,
          index: index + 1,
        }));
      setUsers(usersWithIndex);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const getRowId = (row: any) => row._id;

  useEffect(() => {
    fetchAllUsers();
    if (!isLoggedIn()) {
      navigate(RoutePaths.login);
    }
  }, []);

  interface ClickableCellProps {
    value: string;
    onClick: () => void;
  }

  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      {isLoggedIn() && (
        <Box sx={{ height: 800, width: '80%', marginInline: 'auto' }}>
          <Typography
            component='h3'
            textAlign='center'
            sx={{ marginBlock: 2, fontSize: '2rem', fontWeight: 'bold' }}
          >
            Users
          </Typography>

          {isFetching ? (
            <Typography textAlign='center'>Loading...</Typography>
          ) : (
            <Grid container justifyContent='flex-end' spacing={2}>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setIsCreateUserDialogOpen(true)}
                >
                  Create New User
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  rows={users}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 15 },
                    },
                  }}
                  pageSizeOptions={[15, 30, 50]}
                  getRowId={getRowId}
                />
              </Grid>
              <CreateUserDialog
                isCreateUserDialogOpen={isCreateUserDialogOpen}
                setIsCreateUserDialogOpen={setIsCreateUserDialogOpen}
              />
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
