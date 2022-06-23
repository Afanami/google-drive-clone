import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateProfile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match");

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    toast.promise(
      Promise.all(promises)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          setError("Failed to update account");
        })
        .finally(() => {
          setLoading(false);
        }),
      {
        loading: "Updating details...",
        success: <b>Details saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                ref={emailRef}
                placeholder="New email?"
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="New password?"
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-4">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="New password?"
              />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
