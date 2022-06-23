import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Container from "react-bootstrap/esm/Container";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../Contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { currentUser } = useAuth();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Toaster />
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                currentUser ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/update-profile"
              element={
                currentUser ? (
                  <UpdateProfile />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
    </Container>
  );
}

export default App;
