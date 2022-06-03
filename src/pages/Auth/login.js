import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const checkValidation = () => {}
    function handleSignIn(e) {
      e.preventDefault();
    //  const isValid = checkValidation();
    //   if (isValid) {
  
     
        setEmail("");
        setPassword("");
        let signInDetails = { email: email, password: password };
        console.log(signInDetails);
        axios
          .post("https://reqres.in/api/login", signInDetails)
          .then((respoose) => {
            console.log(respoose);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  return (
    <Container>
      <Card className="mx-auto mt-5" style={{ width: "25rem" }}>
      <Card.Header> <h3>Login</h3></Card.Header>
      <Card.Body>
        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>
            <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            className="form-control "/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password </Form.Label>
            <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
              className="form-control "/>
          </Form.Group>
          <Button type="submit" variant="primary" size="lg" className="w-100">Submit</Button>
        </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3 mb-5">
           Create account? <Link to="/register">Register</Link> 
        </div>
    </Container>
  );
};

export default Login;