import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section>
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="username"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validationEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="email"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="email"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validationPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="password"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Password required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="d-block mx-auto">
              Submit
            </Button>
            {err && <div>{err}</div>}
          <div className="text-center bg-info w-50 mx-auto">
            Do you have an account? <Link to="/login">Login</Link>
          </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Register;
