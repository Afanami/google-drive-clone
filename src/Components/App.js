import React from "react";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Profile from "./authentication/Profile";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";
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
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* GDRIVE */}
          <Route
            exact
            path="/folder/:folderId"
            element={
              currentUser ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />

          {/* PROFILE */}
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
            path="/user"
            element={
              currentUser ? (
                <Profile />
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

          {/* AUTH */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
