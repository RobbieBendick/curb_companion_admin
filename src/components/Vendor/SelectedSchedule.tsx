import {
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

interface ScheduleItem {
  days: string[];
  startTime: string | null;
  endTime: string | null;
}
export function SelectedSchedule({
  selectedSchedule,
  setSelectedSchedule,
}: {
  selectedSchedule: ScheduleItem[];
  setSelectedSchedule: any;
}) {
  const handleDeleteScheduleItem = (indexToDelete: number) => {
    setSelectedSchedule((prevSchedule: ScheduleItem[]) => {
      const updatedSchedule = [...prevSchedule];
      updatedSchedule.splice(indexToDelete, 1);
      return updatedSchedule;
    });
  };

  return (
    <>
      {selectedSchedule.length > 0 && (
        <motion.div>
          <TableContainer sx={{ width: '65%', margin: '0 auto', mt: 10 }}>
            <Typography
              variant='h5'
              sx={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}
            >
              Scheduled Times
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day(s)</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell></TableCell>{' '}
                  {/* Empty TableCell for the delete button */}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedSchedule.map((item: ScheduleItem, index: number) => {
                  if (
                    !item.startTime ||
                    !item.endTime ||
                    item.days.length === 0
                  )
                    return null;
                  return (
                    <TableRow key={`schedule-item-${index}`}>
                      <TableCell>{item.days}</TableCell>
                      <TableCell>{item.startTime}</TableCell>
                      <TableCell>{item.endTime}</TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteScheduleItem(index)}
                          aria-label='Delete'
                          color='primary'
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      )}
    </>
  );
}
