import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

import { StyledLogoutButton } from "./logOutButtonStyles";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <StyledLogoutButton onClick={handleLogOut}>Log out</StyledLogoutButton>
  );
}

export default LogoutButton;
