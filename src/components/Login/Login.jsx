import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { logIn } from "../../store/slices/authSlice";
import { auth, db } from "../../firebase-app/firebase-app";

import { errors as errorMessages } from "../../utils/errors";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: false,
    }));

    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitData = async () => {
    setErrors({
      email: false,
      password: false,
    });

    let hasError = checkData();
    if (hasError) return;

    try {
      const userQuery = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const uid = userQuery.user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { firstName, paidLeave, history } = docSnap.data();

        dispatch(logIn({ name: firstName, paidLeave, history, id: uid }));
        navigate("/");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkData = () => {
    let hasError = false;

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email)
    ) {
      setErrors((prev) => ({
        ...prev,
        email: true,
      }));
      hasError = true;
    }

    if (loginData.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: true,
      }));
      hasError = true;
    }

    return hasError;
  };

  return (
    <>
      <Card
        sx={{
          margin: "150px auto",
          maxWidth: "400px",
          height: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            required
            type="email"
            id="email"
            name="email"
            label="Email"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={onChangeHandler}
            error={errors.email}
            helperText={errors.email && errorMessages.email}
          />

          <TextField
            required
            id="password"
            name="password"
            label="Password"
            variant="standard"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            onChange={onChangeHandler}
            error={errors.password}
            helperText={errors.password && errorMessages.password}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ margin: "0 auto" }}
            onClick={submitData}
          >
            Log in
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Login;
