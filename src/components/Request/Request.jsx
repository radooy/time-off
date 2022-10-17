import { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StyledHeading, StyledContainer, StyledDatesContainer, StyledText, StyledError } from "./requestStyles";

function Request() {
    const date = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    const daysLeft = useSelector((state) => state.auth.paidLeave);

    const [timeoff, setTimeoff] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(tomorrow);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setTimeoff(event.target.value);
    };

    const handleStartDateChange = (e) => {
        setError('');
        setStartDate(e);
    };

    const handleEndDateChange = (e) => {
        setError('');
        setEndDate(e);
    };

    const submitRequest = () => {
        let requestDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

        if (timeoff !== 'sickness' && requestDays > daysLeft) {
            setError(`You have requested ${requestDays} days. Maximum allowed amount is ${daysLeft} days.`);
            return;
        };
    };

    return (
        <StyledContainer>
            <StyledHeading>Request</StyledHeading>
            <FormControl fullWidth>
                <InputLabel id="select-label">Type</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={timeoff}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={'paid-leave'}>Paid leave</MenuItem>
                    <MenuItem value={'sickness'}>Sickness</MenuItem>
                </Select>
            </FormControl>
            {timeoff === 'paid-leave' && <StyledText>You have <b>{daysLeft}</b> days left</StyledText>}
            <StyledDatesContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DesktopDatePicker
                        disabled={timeoff === ''}
                        label="From"
                        inputFormat="dd/MM/yyyy"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DesktopDatePicker
                        disabled={timeoff === ''}
                        label="To"
                        inputFormat="dd/MM/yyyy"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </StyledDatesContainer>
            <TextField
                disabled={timeoff === ''}
                label="Please type in reason"
                variant="outlined"
                value={reason} onChange={(e) => setReason(e.target.value)}
            />
            {error !== '' && <StyledError>{error}</StyledError>}
            <Button
                disabled={timeoff === '' || reason === ''}
                variant="contained"
                sx={{ margin: "0 0 0 auto" }}
                onClick={submitRequest}
            >
                Submit
            </Button>
        </StyledContainer>
    )
};

export default Request;
