import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StyledHeading, StyledContainer, StyledDatesContainer } from "./requestStyles";

function Request() {
    const date = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    const [timeoff, setTimeoff] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(tomorrow);
    const [reason, setReason] = useState('');

    const handleChange = (event) => {
        setTimeoff(event.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e);
    };

    const submitRequest = () => {
        console.log('submit');
    }

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
            <StyledDatesContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DesktopDatePicker
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
                        label="To"
                        inputFormat="dd/MM/yyyy"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </StyledDatesContainer>
            <TextField
                label="Please type in reason"
                variant="outlined"
                value={reason} onChange={(e) => setReason(e.target.value)}
            />
            <Button
                        variant="contained"
                        sx={{ margin: "0 0 0 auto" }}
                        onClick={submitRequest}
                    >
                        Submit
            </Button>
        </StyledContainer>

    )
}

export default Request;
