import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import InputGroup from "react-bootstrap/InputGroup";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(inputs);
  //     navigate("/");
  //   } catch (err) {
  //     setError(err.response.data);
  //   }
  // };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
    setValidated(true);
  };

  return (
    <section>
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustomUsername">
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

            <Form.Group controlId="validationCustomPassword">
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
              Don't you have an account? <Link to="/register">Register</Link>
            </div>
          </Form>
        </div>
      </div>
    </section>

    // <div className="auth">
    //   <h1>Login</h1>
    //   <form>
    //     <input
    //       required
    //       type="text"
    //       placeholder="username"
    //       name="username"
    //       onChange={handleChange}
    //     />
    //     <input
    //       required
    //       type="password"
    //       placeholder="password"
    //       name="password"
    //       onChange={handleChange}
    //     />
    //     <button onClick={handleSubmit}>Login</button>
    //     {/* {err && <p>{err}</p>} */}
    //     <div>
    //       Don't you have an account? <Link to="/register">Register</Link>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Login;
