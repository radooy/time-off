import { useRequest } from "../../hooks/useRequest";

import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StyledHeading, StyledContainer, StyledDatesContainer, StyledText, StyledError } from "./requestStyles";

import differenceInBusinessDays from 'date-fns/differenceInBusinessDays'

import { errors } from "../../utils/messages/errors";
import { plainText } from "../../utils/messages/plainText";

function Request() {
    const {
        daysLeft,
        timeoff,
        startDate,
        endDate,
        reason,
        setReason,
        error,
        setError,
        file,
        setFile,
        fileError,
        setFileError,
        handleChange,
        handleStartDateChange,
        handleEndDateChange
    } = useRequest(new Date());

    const submitRequest = () => {
        const requestDays = differenceInBusinessDays(endDate, startDate);

        if (timeoff !== plainText.sickLeaveValue && requestDays > daysLeft) {
            setError(errors.paidLeaveDays);
            return;
        };

        if (requestDays < 1) {
            setError(errors.date);
            return;
        };
    };

    const onFileUpload = (e) => {
        setFileError('');

        if (!!e.target.files[0]) {
            const sizeMB = ((e?.target?.files[0]?.size) / 1024 / 1024).toFixed(2);
            const type = e?.target?.files[0]?.type;

            if (sizeMB < 2 && (type === plainText.pdf || type === plainText.png || type === plainText.jpeg)) {
                setFile(e.target.files[0]);
                return;
            };

            setFileError(errors.file);
            setFile('');
        };
    };

    const disableWeekends = (date) => {
        return date.getDay() === 0 || date.getDay() === 6;
    };

    return (
        <StyledContainer>
            <StyledHeading>{plainText.request}</StyledHeading>
            <FormControl fullWidth>
                <InputLabel id="select-label">{plainText.type}</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={timeoff}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={plainText.paidLeaveValue}>{plainText.paidLeave}</MenuItem>
                    <MenuItem value={plainText.sickLeaveValue}>{plainText.sickLeave}</MenuItem>
                </Select>
            </FormControl>

            {timeoff === plainText.paidLeaveValue &&
                <StyledText>You have <b>{daysLeft}</b> days left</StyledText>
            }

            <StyledDatesContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DesktopDatePicker
                        disabled={timeoff === ""}
                        label="From"
                        inputFormat="dd/MM/yyyy"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        shouldDisableDate={disableWeekends}
                    />
                </LocalizationProvider>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DesktopDatePicker
                        disabled={timeoff === ""}
                        label="To"
                        inputFormat="dd/MM/yyyy"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        shouldDisableDate={disableWeekends}
                        minDate={endDate}
                    />
                </LocalizationProvider>
            </StyledDatesContainer>

            {timeoff === plainText.sickLeaveValue &&
                <TextField
                    id="file"
                    type="file"
                    helperText={fileError || plainText.attachPhoto}
                    onChange={onFileUpload}
                    error={!!fileError}
                />
            }

            {timeoff === plainText.paidLeaveValue &&
                <TextField
                    label={plainText.typeReason}
                    variant="outlined"
                    value={reason} onChange={(e) => setReason(e.target.value)}
                />
            }

            {error !== "" &&
                <StyledError>{error}</StyledError>
            }

            <Button
                disabled={
                    timeoff === '' ||
                    (timeoff === plainText.sickLeaveValue && file === '') ||
                    (timeoff === plainText.paidLeaveValue && reason === '')
                }
                variant="contained"
                sx={{ margin: "0 0 0 auto" }}
                onClick={submitRequest}
            >
                {plainText.submit}
            </Button>
        </StyledContainer>
    )
};

export default Request;
