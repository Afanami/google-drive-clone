import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import NavBarCustom from "../google-drive/NavBarCustom";

export default function Profile() {
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <NavBarCustom isProfile={true}></NavBarCustom>
      <CenteredContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: </strong>
            {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="d-flex flex-column w100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
          <Button variant="link" as={Link} to="/">
            Back To Drive?
          </Button>
        </div>
      </CenteredContainer>
    </>
  );
}
