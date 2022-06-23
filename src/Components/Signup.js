import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match");

    try {
      setError("");
      setLoading(true);

      await toast.promise(
        signup(emailRef.current.value, passwordRef.current.value),
        {
          loading: "Creating your account...",
          success: <b>Welcome!</b>,
          error: <b>Failed to create account.</b>,
        }
      );

      navigate("/");
    } catch (err) {
      console.log("hi");
      setError("Email already exists or Password is insufficient.");
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder="johndoe@gmail.com"
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-4">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Password Confirmation"
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
