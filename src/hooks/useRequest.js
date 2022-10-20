import { useState } from 'react';
import { useSelector } from 'react-redux';

export function useRequest(date) {
    const tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);

    const daysLeft = useSelector((state) => state.auth.paidLeave);

    const [timeoff, setTimeoff] = useState('');
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(tomorrow);
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState('');
    const [fileError, setFileError] = useState('');

    const handleChange = (event) => {
        resetForm();
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

    const resetForm = () => {
        setError('');
        setFileError('');
        setStartDate(date);
        setEndDate(tomorrow);
        setFile('');
        setReason('');
    };

    return {
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
        handleEndDateChange,
    };
};