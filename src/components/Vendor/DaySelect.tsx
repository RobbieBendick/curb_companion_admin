import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
} from '@mui/material';
import React from 'react';

export function MultiSelectDays({ formik }: { formik: any }) {
  const days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return (
    <Grid item xs={12}>
      <FormControl
        fullWidth
        error={formik.touched.days && Boolean(formik.errors.days)}
      >
        <InputLabel>Day(s)</InputLabel>
        <Select
          name='days'
          multiple
          value={formik.values.days} // use formik values directly
          onChange={formik.handleChange} // formik's change handler
          onBlur={formik.handleBlur} // formik's blur handler
          renderValue={(selected: string[]) =>
            (selected as string[]).join(', ')
          }
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '25rem',
              },
            },
          }}
        >
          {days.map(day => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={formik.values.days.includes(day)} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
        {formik.touched.days && (
          <FormHelperText>{formik.errors.days}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
