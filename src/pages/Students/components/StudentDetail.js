import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3000/students/${id}`);
        setStudent(student.data);
      } catch (error) {
        console.log("Error Message");
      }
    }
    getStudent();
  }, [id]);

  function handleBackBtn() {
    navigate("/students");
  }

  return (
    <Container>
      <Button variant="primary" className="my-3" onClick={handleBackBtn}>
        Back
      </Button>
      <Alert variant="success" className="text-center">
        <h3>Student Detail</h3>
      </Alert>
      <Table responsive="sm" hover bordered>
        <thead>
          <tr>
            <th className="text-center">Id</th>
            <th> Name</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center align-middle">{student.id}</td>
            <td className="align-middle">{student.studentName}</td>
            <td className="align-middle">{student.email}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentDetail;
