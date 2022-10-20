import { useRequest } from "../../hooks/useRequest";

import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StyledHeading, StyledContainer, StyledDatesContainer, StyledText, StyledError } from "./requestStyles";

import differenceInBusinessDays from 'date-fns/differenceInBusinessDays'

import { errors } from "../../utils/errors";
import { constants } from "../../utils/constants";

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

        if (timeoff !== constants.sickLeaveValue && requestDays > daysLeft) {
            setError(errors.paidLeaveDays);
            return;
        };

        if (requestDays < constants.minRequestDays) {
            setError(errors.date);
            return;
        };
    };

    const onFileUpload = (e) => {
        setFileError('');

        if (!!e.target.files[0]) {
            const sizeMB = ((e?.target?.files[0]?.size) / 1024 / 1024).toFixed(2);
            const type = e?.target?.files[0]?.type;

            if (sizeMB < constants.fileSizeMB && (type === constants.pdf || type === constants.png || type === constants.jpeg)) {
                setFile(e.target.files[0]);
                return;
            };

            setFileError(errors.file);
            setFile('');
        };
    };

    const disableWeekends = (date) => {
        return date.getDay() === constants.sundayCalendarNumber || date.getDay() === constants.saturdayCalendarNumber;
    };

    return (
        <StyledContainer>
            <StyledHeading>{constants.request}</StyledHeading>
            <FormControl fullWidth>
                <InputLabel id="select-label">{constants.type}</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={timeoff}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={constants.paidLeaveValue}>{constants.paidLeave}</MenuItem>
                    <MenuItem value={constants.sickLeaveValue}>{constants.sickLeave}</MenuItem>
                </Select>
            </FormControl>

            {timeoff === constants.paidLeaveValue &&
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

            {timeoff === constants.sickLeaveValue &&
                <TextField
                    id="file"
                    type="file"
                    helperText={fileError || constants.attachPhoto}
                    onChange={onFileUpload}
                    error={!!fileError}
                />
            }

            {timeoff === constants.paidLeaveValue &&
                <TextField
                    label={constants.typeReason}
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
                    (timeoff === constants.sickLeaveValue && file === '') ||
                    (timeoff === constants.paidLeaveValue && reason === '')
                }
                variant="contained"
                sx={{ margin: "0 0 0 auto" }}
                onClick={submitRequest}
            >
                {constants.submit}
            </Button>
        </StyledContainer>
    )
};

export default Request;
