import axios from "axios";
import React, { Fragment, useState } from "react";
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import EmployeeModal from "./components/EmployeeModal";
import List from "./components/List";

const Employees = () => {
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  const[successList, setSuccessList] =useState(false);
  const handleEmployeeBtn = () => {
    setEmployeeModalShow(!employeeModalShow);
  }
  const updateList = () => {
    setSuccessList(!successList);
  }

  return (
    <Fragment>
      <Container>
        <div className="mt-5">
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Alert
                variant="primary"
                className="d-flex justify-content-between align-items-center"
              >
                <h3 className="my-2">Employees List</h3>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleEmployeeBtn}
                >
                  Add Employee
                </Button>
              </Alert>
              <List updateUserList={successList} />
            </Col>
          </Row>
        </div>
      </Container>
      {employeeModalShow && (
        <EmployeeModal showEmployeeModal={handleEmployeeBtn} 
        closeEmployeeModal={handleEmployeeBtn } 
        updateListData={updateList}

        />
      )}
      
    </Fragment>
  );
};

export default Employees;
