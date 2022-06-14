import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeDataService from "../../../services/EmployeeService";
const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empSingle, setEmpSingle] = useState({});
  useEffect(() => {
    const getEmpSingle = async () => {
      try {
        const empDataSingle = await EmployeeDataService.getEmployee(id);
       // console.log("data:", empDataSingle.data());
        setEmpSingle(empDataSingle.data());

      } catch (error) {
        console.log("Error Message");
      }
    };
    getEmpSingle();
    //  console.log(getEmpSingle);
  }, [id]);

  function handleBackBtn() {
    navigate("/employees");
  }

  return (
    <Container>
      {/* <pre>{JSON.stringify(empSingle, undefined, 2)}</pre> */}
      <Button variant="primary" className="my-3" onClick={handleBackBtn}>
        Back
      </Button>
     
      <Row>
        <Col md={{offset:3, span:6}}>
        <Alert variant="success" className="text-center">
        <h3>Student Detail</h3>
      </Alert>
        <Table responsive="sm" hover bordered>
        <tbody>
          <tr>
            <th>Id</th>
            <td className="align-middle">{id}</td>
          </tr>

          <tr>
            <th> Name</th>
            <td className="align-middle">{empSingle.empName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td className="align-middle">{empSingle.email}</td>
          </tr>
          <tr>
            <th> DOB</th>
            <td className="align-middle">{empSingle.dob}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td className="align-middle">{empSingle.salary}</td>
          </tr>
          <tr>
            <th>At work</th>
            <td className="align-middle">{empSingle.workStatus == true ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </Table>
        </Col>
      </Row>
    
    </Container>
  );
};

export default EmployeeDetail;
