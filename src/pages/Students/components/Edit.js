import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  FormControl,
  Button,
  FormLabel,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [updateStudent, setUpdateStudent] = useState({
    studentName: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  function backBtn() {
    navigate("/students");
  }
  useEffect(() => {
    async function updateStudentData() {
      try {
        const updateStudent = await axios.get(
          `http://localhost:3000/students/${id}`
        );
        setUpdateStudent(updateStudent.data);
       
      } catch (error) {
        console.log("Error Message");
      }
    }
    updateStudentData();
  }, [id]);
  const handleChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setUpdateStudent({ ...updateStudent, [nameInput]: valueInput });
  };
  async function handleUpdateBtn(e) {
    e.preventDefault();
    navigate("/students");
    try {
      await axios.put(`http://localhost:3000/students/${id}`, updateStudent);
    } catch (error) {
      console.log("Error Message");
    }
  }
  return (
    <Container>
      <Button variant="primary" className="mt-5 mb-3" onClick={backBtn}>
        Back
      </Button>
      <Row className="justify-content-center">
        <Col md="6">
          <Alert variant="primary" className="text-center">
            <h3>Edit Student</h3>
          </Alert>
          <Form onSubmit={handleUpdateBtn}>
            <FormGroup className="mb-3">
              <FormLabel>Student Id</FormLabel>
              <FormControl
                type="text"
                value={id}
                
                disabled
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Student Name</FormLabel>
              <FormControl
                type="text"
                name="studentName"
                value={updateStudent.studentName}
                required
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Student Email</FormLabel>
              <FormControl
                type="email"
                value={updateStudent.email}
                required
                name="email"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Button type="submit" variant="primary" className="btn-block">
                Update
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
