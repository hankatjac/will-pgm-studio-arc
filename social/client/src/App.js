import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
