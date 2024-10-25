import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';

export function StateDropdown({ formik }: { formik: any }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  return (
    <Autocomplete
      sx={{ textAlign: 'center' }}
      open={isOpen}
      isOptionEqualToValue={(option, value) => option === value}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      value={formik.values.state}
      onChange={(event: React.SyntheticEvent, newValue: string | null) => {
        setIsOpen(false);
        formik.setFieldValue('state', newValue);
        formik.setFieldTouched('state', true, false);
      }}
      options={states}
      renderInput={params => (
        <TextField
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          name='state'
          sx={{ cursor: 'pointer' }}
          {...params}
          label='State'
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
    />
  );
}
