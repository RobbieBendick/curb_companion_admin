import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

export function MultiSelectTags({
  formik,
  tagTitleList,
}: {
  formik: any;
  tagTitleList: any;
}) {
  // This is just incase we dont get anything from the backend
  const backupTags: string[] = [
    'American',
    'Mexican',
    'Colombian',
    'Wings',
    'Sandwiches',
    'Breakfast',
    'Tacos',
    'Ice Cream',
    'Pizza',
    'Greek',
    'Turkish',
    'Dessert',
    'Japanese',
    'Pasta',
    'Coffee',
    'Indian',
    'Salad',
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (event: any) => {
    setSelectedTags(event.target.value);
    formik.setFieldValue('tags', event.target.value);
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>Tags</InputLabel>
        <Select
          name='tags'
          multiple
          value={selectedTags}
          onChange={handleTagChange}
          renderValue={selected => (selected as string[]).join(', ')}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '25rem',
              },
            },
          }}
        >
          {tagTitleList
            ? tagTitleList.map((tag: any) => (
                <MenuItem key={tag.title} value={tag.title}>
                  <Checkbox checked={selectedTags.includes(tag.title)} />
                  <ListItemText primary={tag.title} />
                </MenuItem>
              ))
            : backupTags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={selectedTags.includes(tag)} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
