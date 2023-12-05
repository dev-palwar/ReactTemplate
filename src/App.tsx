import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Home";

const App: React.FC = () => {
  const isUserLoggedIn = !!localStorage.getItem("userDetails");

  const HomeRoute = () => {
    if (isUserLoggedIn) {
      return <Home />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeRoute />} />
        <Route index element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
