import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Background from './components/Background/Background';
import SideNav from './components/SideNav/SideNav';
import LogoutButton from './components/LogoutButton/LogoutButton';
import Request from './components/Request/Request';

import { Container, Card } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

function App() {

  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div>
      <Container>
        <div className="flex space-between">
          <h1>Time off <span>by Radooy</span></h1>
          {loggedIn && <LogoutButton />}
        </div>
        {loggedIn ?
          <Background>
            <SideNav />
            <Card sx={{
              padding: "20px",
              width: "100%",
              minHeight: {
                xs: "350px",
                md: "initial"
              }
            }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="request" element={<Request />} />
              </Routes>
            </Card>
          </Background> :
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        }

      </Container>
    </div>
  );
}

export default App;
