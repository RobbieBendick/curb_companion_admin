import React, { useState } from 'react';
import { formatDateTime } from '../../shared/helpers/helpers';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import IOccurrence from '../../shared/interfaces/occurrence';
import { RRULEGenerator } from '../RruleGenerator';
import { DeleteVendorOccurrenceDialog } from './Dialogs/DeleteVendorOccurrenceDialog';

export const AddScheduleDialog = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
}: {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: any;
}) => {
  return (
    <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
      <DialogContent>
        <RRULEGenerator />
      </DialogContent>
    </Dialog>
  );
};

interface VendorScheduleProps {
  schedule: IOccurrence[];
}

export const VendorSchedule: React.FC<VendorScheduleProps> = ({ schedule }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsAddDialogOpen(true);
  };

  const [isDeleteOccurrenceDialogOpen, setIsDeleteOccurrenceDialogOpen] =
    useState<boolean>(false);

  const [deleteOccurrenceIndex, setDeleteOccurrenceIndex] =
    useState<number>(-1);

  return (
    <>
      <Grid justifyContent='center' item xs={12}>
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          item
          xs={12}
        >
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
          >
            Schedule
          </Typography>
          <IconButton onClick={handleAddButtonClick} aria-label='add'>
            <AddCircle />
          </IconButton>
        </Grid>
        {schedule &&
          schedule.map((scheduleItem: any, idx: number) => (
            <Grid item xs={12} key={scheduleItem._id} position='relative'>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
              >
                Occurrence {idx + 1}
              </Typography>
              {scheduleItem.start && (
                <Typography>
                  Start: {formatDateTime(scheduleItem.start)}
                </Typography>
              )}
              <Typography>End: {formatDateTime(scheduleItem.end)}</Typography>
              {scheduleItem.recurrence &&
                scheduleItem.recurrence.map(
                  (recurrenceItem: any, index: number) => (
                    <Typography key={index}>
                      Recurrence {index + 1}: {recurrenceItem}
                    </Typography>
                  )
                )}
              <IconButton
                sx={{ position: 'absolute', top: '40%', right: 0 }}
                onClick={() => {
                  setIsDeleteOccurrenceDialogOpen(true);
                  setDeleteOccurrenceIndex(idx);
                }}
              >
                <Delete />
              </IconButton>
            </Grid>
          ))}
      </Grid>
      <AddScheduleDialog
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
      />
      <DeleteVendorOccurrenceDialog
        isDeleteOccurenceDialogOpen={isDeleteOccurrenceDialogOpen}
        setIsDeleteOccurenceDialogOpen={setIsDeleteOccurrenceDialogOpen}
        occurrenceIndex={deleteOccurrenceIndex}
      />
    </>
  );
};
