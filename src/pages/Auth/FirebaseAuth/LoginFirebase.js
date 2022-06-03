import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  passwordCond1,
  passwordCond2,
  passwordCond3,
  emailCond,
} from "../../../utils/validation";

const LoginFirebase = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
  const onChangeHandler = (e) => {
    const itemValue = e.target.value;
    const nameInput = e.target.name;
    setValues({ ...values, [nameInput]: itemValue });
     // Email validation
     if (nameInput == "email") {
      if (!values.email) {
        errorMsg.email = "Email required";
      } else if (!emailCond.test(values.email)) {
        errorMsg.email = "Email not valod";
      } else {
        delete errorMsg.email;
        setSubmitButtonDisabled(false);
      }
    }
    // password validation
    if (nameInput == "password") {
      const password = values.password;
      if (!password) {
        errorMsg.password = "password is required";
      } else if (password.length < 6) {
        errorMsg.password = "Password must be longer than 6 characters";
      } else if (password.length >= 20) {
        errorMsg.password = "Password must shorter than 20 characters";
      } else if (!passwordCond1.test(password)) {
        errorMsg.password = "Password must contain at least one lowercase";
      } else if (!passwordCond2.test(password)) {
        errorMsg.password = "Password must contain at least one capital letter";
      } else if (!passwordCond3.test(password)) {
        errorMsg.password = "Password must contain at least a number";
      } else {
        delete errorMsg.password;
        setSubmitButtonDisabled(false);
      }
    }
  };

  const checkValidation = () => {
    let errorMsg = {};
    let isValid = true;
    // Email validation
    if (!values.email) {
      errorMsg.email = "Email required";
      isValid = false;
    } else if (!emailCond.test(values.email)) {
      errorMsg.email = "Email not valod";
      isValid = false;
    }

    //password validation
    const password = values.password;
    if (!password) {
      errorMsg.password = "password is required";
      isValid = false;
    } else if (password.length < 6) {
      errorMsg.password = "Password must be longer than 6 characters";
      isValid = false;
    } else if (password.length >= 20) {
      errorMsg.password = "Password must shorter than 20 characters";
      isValid = false;
    } else if (!passwordCond1.test(password)) {
      errorMsg.password = "Password must contain at least one lowercase";
      isValid = false;
    } else if (!passwordCond2.test(password)) {
      errorMsg.password = "Password must contain at least one capital letter";
      isValid = false;
    } else if (!passwordCond3.test(password)) {
      errorMsg.password = "Password must contain at least a number";
      isValid = false;
    }

    setErrorMsg(errorMsg);
    return isValid;
  };
  const handleLoginForm = (e) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);
    const isValid = checkValidation();

    if (isValid) {
      setValues("");
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        console.log(res);
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          //   displayName: inputValue.fullName,
        });
       navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
    } 
  
  };

  return (
    <Container>
      <Card className="mx-auto mt-5" style={{ width: "50rem" }}>
        <Card.Header>
          <h3>Login</h3>

        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLoginForm}>
            <InputField
              label="Email Address"
              type="email"
              name="email"
              onChange={onChangeHandler}
              errors={errorMsg.email}

            />

            <InputField
              label="Password"
              type="password"
              name="password"
              // onChange={(event) =>
              //   setValues((prev) => ({ ...prev, password: event.target.value }))
              // }
              onChange={onChangeHandler}
              errors={errorMsg.password}
            />

            <Button
              disabled={submitButtonDisabled}
              type="submit"
              variant="primary"
              className="w-100"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3 mb-5">
        Create account?{" "}
        <Link to="/register" className="font-bold">
          Register
        </Link>
      </div>
    </Container>
  );
};

export default LoginFirebase;
