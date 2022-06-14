import axios from "axios";
import { updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField/InputField";

import {
  passwordCond1,
  passwordCond2,
  passwordCond3,
  emailCond,
} from "../../../utils/validation";
import { useUserAuth } from "../../../utils/context/UserAuthContext";

const SignUpFirebase = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const { signUp } = useUserAuth();
const navigate = useNavigate();
  const handleInputChange = (event) => {
    const nameInput = event.target.name;
    const valueInput = event.target.value;
    setInputValue({ ...inputValue, [nameInput]: valueInput });
    // console.log("change", inputValue.fullName);
    // Name validation
    if (nameInput == "fullName") {
      if (!inputValue.fullName) {
        errors.fullName = "Name required";
      } else if (inputValue.fullName.length < 3) {
        errors.fullName = "Name required atleast 3 characters ";
      } else {
        delete errors.fullName;
        setSubmitButtonDisabled(false);
      }
    }
    // Email validation
    if (nameInput == "email") {
      if (!inputValue.email) {
        errors.email = "Email required";
      } else if (!emailCond.test(inputValue.email)) {
        errors.email = "Email not valod";
      } else {
        delete errors.email;
        setSubmitButtonDisabled(false);
      }
    }
    // password validation
    const password = inputValue.password;
    if (nameInput == "password") {
      if (!password) {
        errors.password = "password is required";
      } else if (password.length < 6) {
        errors.password = "Password must be longer than 6 characters";
      } else if (password.length >= 20) {
        errors.password = "Password must shorter than 20 characters";
      } else if (!passwordCond1.test(password)) {
        errors.password = "Password must contain at least one lowercase";
      } else if (!passwordCond2.test(password)) {
        errors.password = "Password must contain at least one capital letter";
      } else if (!passwordCond3.test(password)) {
        errors.password = "Password must contain at least a number";
      } else {
        delete errors.password;
        setSubmitButtonDisabled(false);
      }
    }
    //matchPassword validation
    //console.log(valueInput, password);
    if (nameInput == "confirmPassword") {
      if (!inputValue.confirmPassword) {
        errors.confirmPassword = "Password confirmation is required";
      } else if (password !== valueInput) {
        errors.confirmPassword = "Password does not match";
      } else {
        delete errors.confirmPassword;
        setSubmitButtonDisabled(false);
      }
    }
    setErrors(errors);
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
    } else {
      errors.fullName = "";
    }

    // Email validation
    if (!inputValue.email) {
      errors.email = "Email required";
      isValid = false;
    } else if (!emailCond.test(inputValue.email)) {
      errors.email = "Email not valod";
      isValid = false;
    }

    //password validation
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
    } else if (!passwordCond1.test(password)) {
      errors.password = "Password must contain at least one lowercase";
      isValid = false;
    } else if (!passwordCond2.test(password)) {
      errors.password = "Password must contain at least one capital letter";
      isValid = false;
    } else if (!passwordCond3.test(password)) {
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
      errors.confirmPassword = "";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    setSubmitButtonDisabled(true);
    if (isValid) {
      try {
        setSubmitButtonDisabled(false);
        await signUp(inputValue.email, inputValue.password);  
        setInputValue("");
        setSuccess(true);
        navigate("/")
      } catch (err) {
        if (err.code == "auth/email-already-in-use") {
          setErrorMsg("Email already in use");
          setSuccess(false);
        }
        setSubmitButtonDisabled(false);
        setErrors(err.message);
        console.log(err);
      }
    } else {
      setSuccess(false);
    }
    // if (isValid) {
    //   createUserWithEmailAndPassword(
    //     auth,
    //     inputValue.email,
    //     inputValue.password
    //   )
    //     .then(async (res) => {

    //       setSubmitButtonDisabled(false);
    //       const user = res.user;
    //       await updateProfile(user, {
    //         displayName: inputValue.fullName,
    //       });
    //       setInputValue("");
    //       setSuccess(true);
    //     })
    //     .catch((err) => {
    //       if(err.code == "auth/email-already-in-use"){
    //         setErrorMsg("Email already in use");
    //         setSuccess(false)
    //       }
    //       setSubmitButtonDisabled(false);
    //       setErrors(err.message);
    //       console.log(err);
    //     });

    // } else {
    //   setSuccess(false);
    // }
  };
  return (
    <Container>
      {success ? (
        <div className="page-height py-5">
          <Alert variant="success" className="text-center ">
            <Alert.Heading>
              You have successfuly submited your form.
            </Alert.Heading>
            <div>Please click on employee button to continue</div>
          </Alert>

          <Link to="/employees" className="btn btn-primary">
            Employees
          </Link>
        </div>
      ) : (
        <>
          <Card className="mx-auto mt-5" style={{ width: "50rem" }}>
            <Card.Header>
              <h3>Register</h3>
              {errorMsg && <small className="text-danger">{errorMsg}</small>}
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSignUp}>
                <InputField
                  label="Name*"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={inputValue.fullName ?? ""}
                  onChange={handleInputChange}
                  errors={errors.fullName}
                />

                <InputField
                  type="text"
                  label="Email Address*"
                  name="email"
                  value={inputValue.email ?? ""}
                  onChange={handleInputChange}
                  errors={errors.email}
                />

                <InputField
                  type="password"
                  name="password"
                  label="Password*"
                  value={inputValue.password ?? ""}
                  onChange={handleInputChange}
                  errors={errors.password}
                />

                <InputField
                  label="Confirm Password*"
                  type="password"
                  name="confirmPassword"
                  value={inputValue.confirmPassword ?? ""}
                  onChange={handleInputChange}
                  errors={errors.confirmPassword}
                />

                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  type="submit"
                  disabled={submitButtonDisabled}
                >
                  Register
                </Button>
              </form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3 mb-5">
            Already have account?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default SignUpFirebase;
