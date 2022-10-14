import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logOut());
        navigate("/");
    }

    return (
        <div className="log-out" onClick={handleLogOut}>Log out</div>
    )
}

export default LogoutButton;
