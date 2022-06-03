import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    const nameInput = event.target.name;
    const valueInput = event.target.value;
    setInputValue({ ...inputValue, [nameInput]: valueInput });
  };

  const checkValidation = () => {
    let errors = {};
    let isValid = true;
    // Name validation
    if (!inputValue.fullName) {
      errors.fullName = "Name required";
      isValid = false;
    } else if (inputValue.fullName.length < 3) {
      errors.fullName = "Name required atleast 3 characters ";
      isValid = false;
    }

    // Email validation
    const emailCond = /\S+@\S+\.\S+/;
    if (!inputValue.email) {
      errors.email = "Email required";
      isValid = false;
    } else if (!emailCond.test(inputValue.email)) {
      errors.email = "Email not valod";
      isValid = false;
    }

    //password validation
    const cond1 = /^(?=.*[a-z]).{6,20}$/;
    const cond2 = /^(?=.*[A-Z]).{6,20}$/;
    const cond3 = /^(?=.*[0-9]).{6,20}$/;
    const password = inputValue.password;
    if (!password) {
      errors.password = "password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
      isValid = false;
    } else if (password.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
      isValid = false;
    } else if (!cond1.test(password)) {
      errors.password = "Password must contain at least one lowercase";
      isValid = false;
    } else if (!cond2.test(password)) {
      errors.password = "Password must contain at least one capital letter";
      isValid = false;
    } else if (!cond3.test(password)) {
      errors.password = "Password must contain at least a number";
      isValid = false;
    }
    //matchPassword validation
    if (!inputValue.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
      isValid = false;
    } else if (inputValue.confirmPassword !== password) {
      errors.confirmPassword = "Password does not match confirmation password";
      isValid = false;
    } else {
      errors.password = "";
    }

    setErrors(errors);
    return isValid;
  };
  // useEffect(() => {
  //   checkValidation();
  // }, [inputValue]);

  function handleSignUp(e) {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      setInputValue("");
      setSuccess(true);
      let signUpDetails = { ...inputValue };
      axios
        .post("http://localhost:3000/register", signUpDetails)
        .then((respoose) => {
          console.log(respoose);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSuccess(false);
    }
  }
  return (
    <Container>
      {success ? (
        <div className="container-height py-5">
        <Alert variant="success" className="text-center ">
        <Alert.Heading>You have successfuly submited your form.</Alert.Heading>
        <p>
          Please click on login button to continue
        </p>
      </Alert>
  
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
      ) : (
        <>
          <Card className="mx-auto mt-5" style={{ width: "25rem" }}>
            <Card.Header>
              <h3>Register</h3>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSignUp}>
                <Form.Group className="mb-4">
                  <Form.Label> Name</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    id="fullName"
                    value={inputValue.fullName ?? ""}
                    onChange={handleInputChange}
                  />
                  {errors.fullName && (
                    <small className="text-danger">{errors.fullName}</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <input
                    type="text"
                    className="form-control "
                    name="email"
                    value={inputValue.email ?? ""}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Phone Number</Form.Label>
                  <input
                    type="tel"
                    className="form-control "
                    name="phone"
                    value={inputValue.phone ?? ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password </Form.Label>
                  <input
                    type="password"
                    name="password"
                    className="form-control "
                    value={inputValue.password ?? ""}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password </Form.Label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control "
                    value={inputValue.confirmPassword ?? ""}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  type="submit"
                >
                  Register
                </Button>
              </form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3 mb-5">
            Already have account? <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default SignUp;
