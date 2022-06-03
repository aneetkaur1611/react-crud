import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import List from "./components/List";

const Students = () => {
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false);
  const [addStudent, setAddStudent] = useState({
    studentName: "",
    email: "",
  });
  const [status, setStatus] = useState()
  const handleChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setAddStudent({ ...addStudent, [nameInput]: valueInput });

  };
  const checkValidation = () => {
    let errors = {};
    let isValid = true;
    // Name validation
    if (!addStudent.studentName) {
      errors.studentName = "Name required";
      isValid = false;
    } else if (addStudent.studentName.length < 3) {
      errors.studentName = "Name required atleast 3 characters ";
      isValid = false;
    }
  
    // Email validation
    const emailCond = /\S+@\S+\.\S+/;
    if (!addStudent.email) {
      errors.email = "Email required";
      isValid = false;
    } else if (!emailCond.test(addStudent.email)) {
      errors.email = "Email not valod";
      isValid = false;
    }
  
    setErrors(errors);
    return isValid;
  };
  async function handleAddBtn(e) {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      setAddStudent("");
      setSuccess(true);
      try {
         await axios.post(`http://localhost:3000/students/`, addStudent);
        setStatus(true);
      } catch (error) {
        console.log("Error Message");
      }
    }
    else{
      setSuccess(false);
    }
  }

if (status) {
  return <Students />
 }


  return (
    <Container>
      <div className="mt-5">
        <Row>
          <Col md="6">
            <Alert variant="success">
              <h3>Add Student</h3>
            </Alert>
            <Form onSubmit={handleAddBtn}>
              <FormGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Name*"
                  required
                  name="studentName"
                  onChange={handleChange}
                 value={addStudent.studentName ?? ""}
                />
                 {errors.studentName && (
                    <small className="text-danger">{errors.studentName}</small>
                  )}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Email Address*"
                  required
                  name="email"
                  onChange={handleChange}
                 value={addStudent.email ?? ""}
                />
                 {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Button type="submit" variant="primary" className="btn-block">
                  Add Student
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col md="6">
            <Alert variant="primary">
              <h3>Student List</h3>
            </Alert>
            <List />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Students;
