import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            localStorage.getItem("userDetails") ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route index element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
