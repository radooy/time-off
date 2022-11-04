import { useCallback, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { requestPaidLeave } from "../../store/slices/authSlice";

import { useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks/useRequest";

import { db } from "../../firebase-app/firebase-app";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { addBusinessDays, lightFormat } from "date-fns";
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
    StyledHeading,
    StyledContainer,
    StyledDatesContainer,
    StyledText,
    StyledError,
    InfoTextContainer
} from "./requestStyles";

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

    const { id } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const diffInBusDays = useMemo(() => differenceInBusinessDays(endDate, startDate) + 1, [startDate, endDate]);

    const submitRequest = () => {
        const isPaidLeaveRequest = timeoff === constants.paidLeaveValue;

        if (isPaidLeaveRequest && diffInBusDays > daysLeft) {
            setError(errors.paidLeaveDays);
            return;
        };

        if (diffInBusDays < constants.minRequestDays) {
            setError(errors.date);
            return;
        };

        const userRef = doc(db, constants.users, id);
        const historyObject = {
            days: diffInBusDays,
            type: timeoff,
            endDate: lightFormat(endDate, constants.dateFormat),
            startDate: lightFormat(startDate, constants.dateFormat),
        };

        const paidLeave = isPaidLeaveRequest ? Number(Number(daysLeft) - diffInBusDays) : daysLeft;

        if (isPaidLeaveRequest) {
            historyObject.reason = reason;
        };

        if (!isPaidLeaveRequest) {
            historyObject.file = file;
        };

        updateDoc(userRef, {
            paidLeave: paidLeave,
            history: arrayUnion(historyObject)
        }).then(res => {
            if (isPaidLeaveRequest) {
                dispatch(requestPaidLeave({ paidLeave, historyObject }));
            };
            navigate("/");
        }).catch(e => console.log(e));
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

    const sumTotalDaysOutOfOffice = useCallback(() => {
        const sum = differenceInCalendarDays(addBusinessDays(startDate, diffInBusDays), startDate);

        return startDate.getDay() === constants.mondayCalendarNumber ? sum + constants.weekendValue : sum;
    }, [startDate, diffInBusDays]);

    return (
        <StyledContainer>
            <StyledHeading className="pl-10">{constants.request}</StyledHeading>
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
                <StyledText className="pl-10">Days left: <b>{daysLeft}</b></StyledText>
            }

            <StyledDatesContainer>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                >
                    <DesktopDatePicker
                        disabled={timeoff === ""}
                        label="From"
                        inputFormat={constants.dateFormat}
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
                        inputFormat={constants.dateFormat}
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        shouldDisableDate={disableWeekends}
                        minDate={startDate}
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
                <>
                    <TextField
                        label={constants.typeReason}
                        variant="outlined"
                        value={reason} onChange={(e) => setReason(e.target.value)}
                    />

                    {diffInBusDays > 0 &&
                        <InfoTextContainer>
                            <StyledText className="pl-10">
                                Requested days: <b>{diffInBusDays}</b>
                            </StyledText>
                            <StyledText className="pl-10">
                                Total days out of office: <b>{sumTotalDaysOutOfOffice()}</b>
                            </StyledText>
                        </InfoTextContainer>
                    }
                </>
            }

            {error !== "" &&
                <StyledError className="pl-10">{error}</StyledError>
            }

            <Button
                disabled={
                    timeoff === '' ||
                    (timeoff === constants.sickLeaveValue && file === '') ||
                    (timeoff === constants.paidLeaveValue && reason === '') ||
                    diffInBusDays <= 0
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
