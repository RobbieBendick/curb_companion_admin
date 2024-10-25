import React, { useState } from 'react';
import IVendor from '../shared/interfaces/vendor';
import axios, { AxiosRequestConfig } from 'axios';
import { Tokens } from './UserContext';
import CustomSnackbar from '../components/Snackbar';
import IMenuItem from '../shared/interfaces/menu-item';

export interface IVendorContext {
  error: string;
  vendor: IVendor | null;
  headerMapping: { [key: string]: string };
  editedState: Partial<IVendor>;
  uneditedState: Partial<IVendor>;
  sortedEntries: [string, any][];
  isFetching: boolean | (() => boolean);
  isEditing: boolean | (() => boolean);
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  initializeEditedState: () => void;
  initializeUneditedState: () => void;
  fetchVendor: (vendorID: string) => Promise<void>;
  handleSaveChanges: (vendorID: string) => Promise<void>;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelChanges: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  setEditedState: any;
  setVendor: React.Dispatch<React.SetStateAction<IVendor | null>>;
  setNewVendor: any;
  newVendor: IVendor | null;
  addMenuItem: any;
  deleteVendor: any;
  deleteMenuItem: any;
  addressOnChangeHandler: any;
}

export const VendorContext = React.createContext<IVendorContext>({
  error: '',
  vendor: null,
  headerMapping: {},
  editedState: {},
  uneditedState: {},
  sortedEntries: [],
  isFetching: () => false,
  isEditing: () => false,
  setIsEditing: () => {},
  initializeEditedState: () => {},
  initializeUneditedState: () => {},
  fetchVendor: async () => Promise.resolve(),
  handleSaveChanges: async () => Promise.resolve(),
  onChangeHandler: () => {},
  handleCancelChanges: () => {},
  setEditedState: () => {},
  setVendor: () => {},
  setNewVendor: () => {},
  newVendor: null,
  addMenuItem: () => {},
  deleteVendor: () => {},
  deleteMenuItem: () => {},
  addressOnChangeHandler: () => {},
});

const VendorContextProvider: React.FC<any> = ({
  children,
}: {
  children: any;
}) => {
  const [error, setError] = useState<string>('');
  const [vendor, setVendor] = useState<IVendor | null>(null);
  const [newVendor, setNewVendor] = useState<IVendor | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedState, setEditedState] = useState({});
  const [uneditedState, setUneditedState] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarHasError, setSnackbarHasError] = useState(false);

  const headerMapping: { [key: string]: string } = {
    _id: 'ID',
    phoneNumber: 'Phone Number',
    isOpen: 'Open',
    isCatering: 'Catering',
    createdAt: 'Created At',
  };
  const priorityFieldsOrder: string[] = ['title', 'email', 'phoneNumber'];
  const nearEndFieldsOrder: string[] = ['ownerId', '_id'];

  const sortFieldsByPriority = (fields: [string, any][]): [string, any][] => {
    return fields.sort((a, b) => {
      const aPriorityIndex = priorityFieldsOrder.indexOf(a[0]);
      const bPriorityIndex = priorityFieldsOrder.indexOf(b[0]);
      const aNearEndIndex = nearEndFieldsOrder.indexOf(a[0]);
      const bNearEndIndex = nearEndFieldsOrder.indexOf(b[0]);

      if (aPriorityIndex !== -1 && bPriorityIndex === -1) {
        return -1;
      } else if (aPriorityIndex === -1 && bPriorityIndex !== -1) {
        return 1;
      } else if (aNearEndIndex !== -1 && bNearEndIndex === -1) {
        return 1;
      } else if (aNearEndIndex === -1 && bNearEndIndex !== -1) {
        return -1;
      } else {
        // If both are priorities or both are not priorities, maintain the original order
        return 0;
      }
    });
  };

  const excludeFields: { [key: string]: boolean } = {
    views: true,
    rating: true,
    __v: true,
    reviews: true,
    images: true,
    live: true,
    liveHistory: true,
    favorites: true,
    id: true,
  };
  const filteredEntries = Object.entries(vendor || {}).filter(
    ([key]) => !excludeFields[key]
  );
  const sortedEntries = sortFieldsByPriority(filteredEntries);

  const initializeUneditedState = () => {
    for (let i = 0; i < sortedEntries.length; i++) {
      const [key, value] = sortedEntries[i];
      setUneditedState(prevState => ({
        ...prevState,
        [key]: value,
      }));
    }
  };

  const fetchVendor = async (vendorID: string) => {
    setIsFetching(true);
    try {
      const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/vendors/${vendorID}`;
      const res = await axios.get(url);
      const selectedVendor: IVendor = res.data.data;

      if (res.status >= 200 || res.status < 300) {
        setVendor(selectedVendor);
      }
    } catch (err: any) {
      setError(err.response.data.errorMessage);
    } finally {
      setIsFetching(false);
    }
  };

  const findDifferencesBetweenStates: { (): { [key: string]: any } } = () => {
    const differences: { [key: string]: any } = {};

    for (const key in editedState) {
      const hasKeyAndValueIsDifferent =
        editedState.hasOwnProperty(key) &&
        (editedState as any)[key] !== (uneditedState as any)[key];

      if (hasKeyAndValueIsDifferent) {
        differences[key] = (editedState as any)[key];
      }
    }
    return differences;
  };

  const handleSaveChanges = async (vendorID: string) => {
    try {
      const differences = findDifferencesBetweenStates();
      if (Object.keys(differences).length === 0) {
        setIsEditing(false);
        return;
      }
      const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/vendors/${vendorID}`;

      const headers: Record<string, string | null> = {
        [Tokens.ACCESS_TOKEN]: localStorage.getItem(Tokens.ACCESS_TOKEN),
        [Tokens.REFRESH_TOKEN]: localStorage.getItem(Tokens.REFRESH_TOKEN),
      };

      const config: AxiosRequestConfig = {
        headers,
      };
      const res = await axios.patch(url, differences, config);
      if (res.status >= 200 && res.status < 300) {
        setUneditedState(editedState);
      }
    } catch (err: any) {
      console.error('Error saving changes:', err);
    }
  };

  const handleCancelChanges = () => {
    setEditedState(uneditedState);
    setIsEditing(false);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedState({
      ...editedState,
      [event.target.name]: event.target.value,
    });
  };

  const initializeEditedState = () => {
    setEditedState(uneditedState);
  };

  // can't use IMenuItem as the type of the paramater menuItem because IMenuItem requires an id etc.
  const addMenuItem = async (
    menuItem: any,
    formik: any,
    vendorID: string
  ): Promise<void> => {
    try {
      const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/vendors/${vendorID}`;

      // send api request to add item
      const res = await axios.patch(url, menuItem);
      if (res.status >= 200 && res.status < 300) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        formik.resetForm();
        setSnackbarMessage('New menu item successfully created.');
        setSnackbarHasError(false);
      }
    } catch (err: any) {
      console.error('err: ', err);
      setSnackbarMessage(err.response.data.errorMessage);
      setSnackbarHasError(true);
    } finally {
      setIsSnackbarOpen(true);
    }
  };
  const deleteMenuItem = async (
    vendorID: string,
    selectedMenuItem: IMenuItem,
    setIsDeleteMenuItemDialogOpen: any,
    setMenuItemList: any,
    menuItemList: IMenuItem[]
  ) => {
    if (!selectedMenuItem) {
      setSnackbarMessage(`No selected menu item`);
      setIsSnackbarOpen(true);
      setSnackbarHasError(true);
      setIsDeleteMenuItemDialogOpen(false);
      return;
    }
    try {
      const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/vendors/${vendorID}`;
      // TODO: add auth headers
      const res = await axios.patch(url, [selectedMenuItem]);
      if (res.status >= 200 && res.status < 300) {
        setMenuItemList([...menuItemList, selectedMenuItem]);

        const updatedMenuItems = menuItemList.filter(
          (menuItem: IMenuItem) => menuItem._id !== selectedMenuItem._id
        );
        setMenuItemList(updatedMenuItems);
        setSnackbarMessage(`Successfully deleted ${selectedMenuItem.title}`);
        setSnackbarHasError(false);
      }
    } catch (err: any) {
      setSnackbarMessage(err.response.data.errorMessage);
      setSnackbarHasError(true);
    } finally {
      setIsDeleteMenuItemDialogOpen(false);
      setIsSnackbarOpen(true);
    }
  };

  const deleteVendor = async (vendorID: string) => {
    try {
      const url = `http://${import.meta.env.VITE_BACKEND_ADDR}:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/vendors/${vendorID}`;

      // TODO: add headers
      const res = await axios.delete(url);

      if (res.status >= 200 && res.status < 300) {
        // TODO: navigate back to the vendor page
        // TODO: once navigated to the vendor page, show a snackbar of success on vendor page
        setSnackbarMessage(`Successfully deleted ${vendor?.title}`);
        setSnackbarHasError(false);
      }
    } catch (err: any) {
      setSnackbarMessage(err.response.data.errorMessage);
      setSnackbarHasError(true);
    } finally {
      setIsSnackbarOpen(true);
    }
  };

  const addressOnChangeHandler = (event: any) => {
    setEditedState((prevState: any) => ({
      ...prevState,
      location: {
        ...prevState.location,
        address: {
          ...prevState.location?.address,
          [event?.target.name]: event?.target.value,
        },
      },
    }));
  };

  return (
    <VendorContext.Provider
      value={{
        error,
        vendor,
        isFetching,
        isEditing,
        newVendor,
        editedState,
        uneditedState,
        sortedEntries,
        headerMapping,
        fetchVendor,
        onChangeHandler,
        handleSaveChanges,
        handleCancelChanges,
        initializeEditedState,
        initializeUneditedState,
        setEditedState,
        setIsEditing,
        setVendor,
        setNewVendor,
        addMenuItem,
        deleteVendor,
        deleteMenuItem,
        addressOnChangeHandler,
      }}
    >
      {children}
      <CustomSnackbar
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        hasError={snackbarHasError}
        setIsSnackbarOpen={setIsSnackbarOpen}
      />
    </VendorContext.Provider>
  );
};
export default VendorContextProvider;
