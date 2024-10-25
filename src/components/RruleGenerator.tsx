import { CalendarMonth, Delete } from '@mui/icons-material';
import {
  FormControl,
  TextField,
  IconButton,
  Typography,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  ListItemText,
  Button,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Frequency, RRule } from 'rrule';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WeeklySelectDays = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const handleDaySelectChange = (event: any) => {
    setSelectedDays(event.target.value as string[]);
  };

  const daysOfWeek = [
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
      <FormControl fullWidth>
        <InputLabel id='days-of-week-label'>Select Day(s)</InputLabel>
        <Select
          labelId='days-of-week-label'
          multiple
          value={selectedDays}
          onChange={handleDaySelectChange}
          renderValue={selected => (selected as string[]).join(', ')}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '300px',
              },
            },
          }}
        >
          {daysOfWeek.map(day => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={selectedDays.indexOf(day) > -1} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

interface ByDateSelectProps {
  selectedDays: number[];
  setSelectedDays: any;
}
const ByDateSelect: React.FC<ByDateSelectProps> = ({
  selectedDays,
  setSelectedDays,
}) => {
  const handleDaySelectChange = (event: any) => {
    const selectedValueArray = event.target.value;

    const selectedValue = selectedValueArray[selectedValueArray.length - 1];
    if (selectedValue === -1) {
      return setSelectedDays([-1]); // special case for "Use today's date"
    } else {
      return setSelectedDays(selectedValueArray);
    }
  };

  const getOrdinalSuffix = (number: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remainder10 = number % 10;
    const remainder100 = number % 100;
    if (
      remainder10 >= 1 &&
      remainder10 <= 3 &&
      remainder100 !== 11 &&
      remainder100 !== 12 &&
      remainder100 !== 13
    ) {
      return number + suffixes[remainder10];
    } else {
      return number + suffixes[0];
    }
  };
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id='days-of-week-label'>Select Day(s)</InputLabel>
        <Select
          labelId='days-of-week-label'
          multiple
          value={selectedDays}
          onChange={handleDaySelectChange}
          renderValue={selected =>
            selected
              .map(day => {
                if (day === -1) {
                  return "Use today's date";
                }
                return `${getOrdinalSuffix(day)} day`;
              })
              .join(', ')
          }
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '300px',
              },
            },
          }}
        >
          <MenuItem key={-1} value={-1}>
            <Checkbox checked={selectedDays.includes(-1)} />
            <ListItemText primary="Use Today's Date" />
          </MenuItem>
          {Array.from({ length: 31 }, (_, index) => index + 1).map(day => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={selectedDays.includes(day)} />
              <ListItemText primary={`${getOrdinalSuffix(day)} day`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

interface ByMonthSelectProps {
  selectedMonth: number;
  setSelectedMonth: any;
}

const ByMonthSelect: React.FC<ByMonthSelectProps> = ({
  selectedMonth,
  setSelectedMonth,
}) => {
  const months = [
    "Use Today's Month",
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleMonthSelectChange = (event: any) => {
    const selectedValue = event.target.value as number;
    setSelectedMonth(selectedValue);
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id='month-label'>Select Month</InputLabel>
        <Select
          labelId='month-label'
          value={selectedMonth}
          onChange={handleMonthSelectChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '300px',
              },
            },
          }}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

interface ByDaySelectProps {
  selectedDays: string[];
  setSelectedDays: any;
  setRRuleByDay?: any;
}
const ByDaySelect: React.FC<ByDaySelectProps> = ({
  selectedDays,
  setSelectedDays,
  setRRuleByDay,
}) => {
  const handleDaySelectChange = (event: any) => {
    const selectedValues: string[] = event.target.value;
    const convertedValues: string[] = selectedValues.map((value: string) => {
      const [ordinal, day] = value.split(' ');
      let ordinalAcronym: string;
      switch (ordinal) {
        case 'First':
          ordinalAcronym = '1';
          break;
        case 'Second':
          ordinalAcronym = '2';
          break;
        case 'Third':
          ordinalAcronym = '3';
          break;
        case 'Fourth':
          ordinalAcronym = '4';
          break;
        case 'Fifth':
          ordinalAcronym = '5';
          break;
        default:
          ordinalAcronym = '';
      }
      const dayAcronym: string = day.slice(0, 2).toUpperCase();
      return `${ordinalAcronym}${dayAcronym}`;
    });
    setSelectedDays(selectedValues);
    if (setRRuleByDay) {
      setRRuleByDay(convertedValues);
    }
  };

  const ordinalNumbers = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Last',
  ];
  const daysOfWeek = [
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
      <FormControl fullWidth>
        <InputLabel id='days-of-week-label'>Select Day(s)</InputLabel>
        <Select
          labelId='days-of-week-label'
          multiple
          value={selectedDays}
          onChange={handleDaySelectChange}
          renderValue={selected => (selected as string[]).join(', ')}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '300px',
              },
            },
          }}
        >
          {ordinalNumbers.map(ordinal =>
            daysOfWeek.map(day => (
              <MenuItem key={`${ordinal} ${day}`} value={`${ordinal} ${day}`}>
                <Checkbox
                  checked={selectedDays.includes(`${ordinal} ${day}`)}
                />
                <ListItemText primary={`${ordinal} ${day}`} />
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Grid>
  );
};

export const RRULEGenerator = () => {
  const [extraFrequencyOptions, setExtraFrequencyOptions] = useState({
    Daily: ['Every day', 'Every other day'],
    Weekly: ['Every week', 'Every other week'],
    MonthlyByDay: ['Every month', 'Every other month'],
    MonthlyByDate: ['Every month', 'Every other month'],
    YearlyByDay: ['Every year', 'Every other year'],
    YearlyByDate: ['Every year', 'Every other year'],
  });

  const [frequency, setFrequency] = useState<string>('Daily');
  const [rRuleFreq, setRRuleFreq] = useState<Frequency>(Frequency.DAILY);
  const [rRuleInterval, setRRuleInterval] = useState<number>(1);
  const [rRuleByDay, setRRuleByDay] = useState<string[]>([]);

  const [numberOfOccurrences, setNumberOfOccurrences] = useState<
    string | undefined
  >(undefined);

  const [extraFrequency, setExtraFrequency] = useState<string | null>(
    (extraFrequencyOptions as any)[frequency]
      ? (extraFrequencyOptions as any)[frequency][0]
      : null
  );
  useEffect(() => {
    if (frequency === 'YearlyByDay' || frequency === 'YearlyByDate') {
      setRRuleFreq(Frequency.YEARLY);
    } else if (frequency === 'MonthlyByDay' || frequency === 'MonthlyByDate') {
      setRRuleFreq(Frequency.MONTHLY);
    } else if (frequency === 'Daily') {
      setRRuleFreq(Frequency.DAILY);
    } else if (frequency === 'Weekly') {
      setRRuleFreq(Frequency.WEEKLY);
    }
  }, [frequency]);

  const [selectedUntilDate, setSelectedUntilDate] = useState<Date | null>(null);

  const [selectedExclusionDates, setSelectedExclusionDates] = useState<Date[]>(
    []
  );

  const removeExclusionDate = (dateToRemove: Date) => {
    setSelectedExclusionDates(
      selectedExclusionDates.filter(date => date !== dateToRemove)
    );
  };

  const handleExclusionDateChange = (date: Date) => {
    setSelectedExclusionDates([...selectedExclusionDates, date]);
  };

  const dateUntilPickerRef = useRef<DatePicker>(null);
  const exclusionDatePickerRef = useRef<DatePicker>(null);

  const openDatePicker = (ref: DatePicker) => {
    if (ref.current) {
      ref.current.setOpen(true);
    }
  };
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const EmptyComponent: React.FC = () => null;

  const ExclusionDate: React.FC = () => {
    const exclusionDatesString = selectedExclusionDates
      .map(date => formatDate(date))
      .join(', ');

    return (
      <FormControl sx={{ marginBlock: 2, width: '100%' }}>
        <TextField
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => openDatePicker(exclusionDatePickerRef)}
              >
                <CalendarMonth />
              </IconButton>
            ),
          }}
          placeholder='Exclude Date(s)'
          value={exclusionDatesString}
        />
        <DatePicker
          customInput={<EmptyComponent />} // remove input field it automatically provides us
          ref={exclusionDatePickerRef}
          selected={selectedExclusionDates[selectedExclusionDates.length - 1]}
          onChange={handleExclusionDateChange}
          dateFormat='MM/dd/yyyy'
          popperPlacement='bottom-end'
        />
        {/* render the list of selected exclusion dates */}
        {selectedExclusionDates.length > 0 && (
          <Typography variant='h6'>Excluded Dates:</Typography>
        )}
        {selectedExclusionDates.map((date, index) => (
          <>
            <Box
              key={index}
              className='exclusion-date-item'
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                padding: '8px',
                backgroundColor: '#f3f3f3',
                borderRadius: '4px',
                marginBottom: '8px',
              }}
            >
              <Typography>{formatDate(date)}</Typography>
              <IconButton onClick={() => removeExclusionDate(date)}>
                <Delete />
              </IconButton>
            </Box>
          </>
        ))}
      </FormControl>
    );
  };

  function getKeyByValue(
    object: Record<string, string>,
    value: string
  ): string | undefined {
    return Object.entries(object).find(([key, val]) => val === value)?.[0];
  }

  const repeatOptions: string[] = ['Repeat forever', 'Until', 'Occurence(s)'];

  const [repeatOption, setRepeatOption] = useState('forever');
  const handleRepeatOptionChange = (event: any) => {
    setRepeatOption(event.target.value);
  };

  const [yearlyByDaySelectedMonth, setYearlyByDaySelectedMonth] =
    useState<number>(0); // 0 represents "Use Today's Month"
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // 0 represents "Use Today's Month"
  const [monthlyByDate, setMonthlyByDate] = useState<number[]>([]);
  const [yearlyByDay, setYearlyByDay] = useState<string[]>([]);

  const generateRRULEString = () => {
    let rruleString = new RRule({
      freq: rRuleFreq,
      interval: rRuleInterval,
      ...(selectedUntilDate && repeatOption === 'until'
        ? { until: selectedUntilDate }
        : {}),

      ...(frequency === 'YearlyByDate' || frequency === 'MonthlyByDate'
        ? {
            bymonthday: monthlyByDate.includes(-1)
              ? new Date().getDate()
              : monthlyByDate,
          }
        : {}),

      ...(frequency === 'YearlyByDate' || frequency === 'YearlyByDay'
        ? { bymonth: yearlyByDaySelectedMonth || new Date().getMonth() + 1 }
        : {}),

      ...(numberOfOccurrences && repeatOption === 'occurrences'
        ? { count: parseInt(numberOfOccurrences, 10) }
        : {}),
    }).toString();

    // append exclusion dates if they exist
    if (selectedExclusionDates.length > 0) {
      const exdateString = selectedExclusionDates
        .map(date => date.toISOString().substring(0, 10))
        .join(',');
      rruleString += `;EXDATE=${exdateString}`;
    }

    // append BYDAY if applicable
    if (
      rRuleByDay.length > 0 &&
      (frequency === 'MonthlyByDay' || frequency === 'YearlyByDay')
    ) {
      rruleString += `;BYDAY=${rRuleByDay.join(',')}`;
    }

    return rruleString;
  };

  const frequencyHeaderMapping = {
    'Monthly by day': 'MonthlyByDay',
    'Monthly by date': 'MonthlyByDate',
    'Yearly by day': 'YearlyByDay',
    'Yearly by date': 'YearlyByDate',
  };
  const handleFrequencyChange = (event: any) => {
    setFrequency(
      (frequencyHeaderMapping as any)[event.target.value] || event.target.value
    );

    const hasAvailableOptions = (extraFrequencyOptions as any)[
      (frequencyHeaderMapping as any)[event.target.value] || event.target.value
    ][rRuleInterval - 1];

    setExtraFrequency(
      hasAvailableOptions ||
        (extraFrequencyOptions as any)[
          (frequencyHeaderMapping as any)[event.target.value] ||
            event.target.value
        ][0]
    );

    if (!hasAvailableOptions) {
      setRRuleInterval(1);
    }
  };

  const handleExtraFrequencyChange = (event: any) => {
    setExtraFrequency(event.target.value);
  };

  const frequencyOptions: string[] = [
    'Daily',
    'Weekly',
    'Monthly by day',
    'Monthly by date',
    'Yearly by day',
    'Yearly by date',
  ];

  const addOrdinalSuffix = (num: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  // init dropdown values
  useEffect(() => {
    if (extraFrequencyOptions.Daily.length > 2) return;
    const updatedOptions = { ...extraFrequencyOptions };

    for (let i = 3; i <= 30; i++) {
      updatedOptions.Daily.push(`Every ${addOrdinalSuffix(i)} day`);
    }
    for (let i = 3; i <= 26; i++) {
      updatedOptions.Weekly.push(`Every ${addOrdinalSuffix(i)} week`);
    }
    for (let i = 3; i <= 12; i++) {
      updatedOptions.MonthlyByDay.push(`Every ${addOrdinalSuffix(i)} month`);
      updatedOptions.MonthlyByDate.push(`Every ${addOrdinalSuffix(i)} month`);
      if (i === 12) {
        updatedOptions.MonthlyByDay.push(`Every 18th month`);
        updatedOptions.MonthlyByDate.push(`Every 18th month`);
        updatedOptions.MonthlyByDay.push(`Every 24th month`);
        updatedOptions.MonthlyByDate.push(`Every 24th month`);
        updatedOptions.MonthlyByDay.push(`Every 36th month`);
        updatedOptions.MonthlyByDate.push(`Every 36th month`);
        updatedOptions.MonthlyByDay.push(`Every 48th month`);
        updatedOptions.MonthlyByDate.push(`Every 48th month`);
      }
    }

    setExtraFrequencyOptions(updatedOptions);
  }, []);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeChange = (event: any) => {
    const startTimeValue = event.target.value;
    setStartTime(startTimeValue);
  };

  const handleEndTimeChange = (event: any) => {
    const endTimeValue = event.target.value;
    setEndTime(endTimeValue);
  };

  return (
    <Grid item sx={{ width: '100%' }}>
      <Typography
        textAlign='center'
        variant='subtitle1'
        sx={{ fontWeight: 'bold', fontSize: '1.52rem', mb: 1 }}
      >
        Add Occurrence
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Start Time'
            variant='outlined'
            type='time'
            InputLabelProps={{
              shrink: true,
            }}
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='End Time'
            variant='outlined'
            type='time'
            InputLabelProps={{
              shrink: true,
            }}
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id='frequency-label'>Frequency</InputLabel>
            <Select
              labelId='frequency-label'
              value={
                getKeyByValue(frequencyHeaderMapping, frequency) || frequency
              }
              onChange={handleFrequencyChange}
            >
              {frequencyOptions.map((freq: string) => (
                <MenuItem key={freq} value={freq}>
                  {freq}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id='extra-frequency-options-label'>
              Extra frequency options
            </InputLabel>
            <Select
              labelId='extra-frequency-options-label'
              value={extraFrequency}
              onChange={handleExtraFrequencyChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '300px',
                  },
                },
              }}
            >
              {(extraFrequencyOptions as any)[frequency].map(
                (extraOption: string, index: number) => {
                  return (
                    <MenuItem
                      key={extraOption}
                      value={extraOption}
                      onClick={() => setRRuleInterval(index + 1)}
                    >
                      {extraOption}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </Grid>
        {frequency === 'Weekly' && <WeeklySelectDays />}
        {frequency === 'YearlyByDate' && (
          <>
            <Grid item xs={12}>
              <ByMonthSelect
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
              />
            </Grid>
            <Grid item xs={12}>
              <ByDateSelect
                selectedDays={monthlyByDate}
                setSelectedDays={setMonthlyByDate}
              />
            </Grid>
          </>
        )}
        {frequency === 'MonthlyByDate' && (
          <ByDateSelect
            selectedDays={monthlyByDate}
            setSelectedDays={setMonthlyByDate}
          />
        )}
        {frequency === 'MonthlyByDay' && (
          <ByDaySelect
            selectedDays={yearlyByDay}
            setSelectedDays={setYearlyByDay}
            setRRuleByDay={setRRuleByDay}
          />
        )}
        {frequency === 'YearlyByDay' && (
          <>
            <ByMonthSelect
              selectedMonth={yearlyByDaySelectedMonth}
              setSelectedMonth={setYearlyByDaySelectedMonth}
            />
            <ByDaySelect
              selectedDays={yearlyByDay}
              setSelectedDays={setYearlyByDay}
              setRRuleByDay={setRRuleByDay}
            />
          </>
        )}
        <Grid item xs={12}>
          <FormControl component='fieldset'>
            <FormLabel id='demo-radio-buttons-group-label'>
              Repeat Option
            </FormLabel>
            <RadioGroup
              row
              aria-label='repeat-option'
              name='repeat-option'
              value={repeatOption}
              defaultValue={repeatOptions[0]}
              onChange={handleRepeatOptionChange}
            >
              <FormControlLabel
                value='forever'
                control={<Radio />}
                label='Repeat forever'
              />
              <FormControlLabel
                value='until'
                control={<Radio />}
                label='Until'
              />
              <FormControlLabel
                value='occurrences'
                control={<Radio />}
                label='Occurrence(s)'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {repeatOption === 'occurrences' && (
          <Grid item xs={12}>
            <TextField
              placeholder='# of occurrences'
              value={numberOfOccurrences || ''}
              onChange={event => {
                setNumberOfOccurrences(event.target.value);
              }}
            />
          </Grid>
        )}
        {repeatOption === 'until' && (
          <Grid item xs={12}>
            <TextField
              sx={{ width: '100%' }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => openDatePicker(dateUntilPickerRef)}
                  >
                    <CalendarMonth />
                  </IconButton>
                ),
              }}
              placeholder='Repeat until...'
              value={formatDate(selectedUntilDate)}
              onChange={event => {
                setSelectedUntilDate(selectedUntilDate as Date);
              }}
            />
            <DatePicker
              customInput={<EmptyComponent />} // remove input field it automatically provides us
              ref={dateUntilPickerRef}
              selected={selectedUntilDate}
              onChange={(date: Date | null) => setSelectedUntilDate(date)}
              dateFormat='MM/dd/yyyy'
              popperPlacement='bottom-end'
            />
          </Grid>
        )}
      </Grid>

      <ExclusionDate />

      {/* Display generated RRULE string */}
      <Grid item xs={12}>
        <Typography textAlign='center'>{generateRRULEString()}</Typography>
      </Grid>
      <Grid display='flex' item justifyContent='center' xs={12} mt={2}>
        <Button sx={{ width: '100%' }}>Add Occurrence</Button>
      </Grid>
    </Grid>
  );
};
