import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function useRequest(date) {
  const { paidLeave: daysLeft, id } = useSelector((state) => state.auth);

  const [timeoff, setTimeoff] = useState("");
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    resetForm();
    setTimeoff(event.target.value);
  };

  const handleStartDateChange = (e) => {
    setError("");
    setStartDate(e);
  };

  const handleEndDateChange = (e) => {
    setError("");
    setEndDate(e);
  };

  const resetForm = () => {
    setError("");
    setFileError("");
    setStartDate(date);
    setEndDate(date);
    setFile("");
    setReason("");
  };

  return {
    id,
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
    navigate,
    dispatch,
  };
}
