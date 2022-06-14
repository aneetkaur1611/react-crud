import React, { Fragment, useState } from "react";
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import EmployeeModal from "./components/EmployeeModal";
import List from "./components/List";
import ListCustomSearch from "./components/ListCustomSearch";

const Employees = () => {
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);

  const refreshList = () => {
    setRefreshSuccess(!refreshSuccess);
    setAddSuccessMsg(true);
  };
  const deleteAddSuccessMsg = () => {
    setAddSuccessMsg(!addSuccessMsg);
  };
 
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
                <Button variant="primary" size="sm" onClick={()=>{setEmployeeModalShow(true)}}>
                  Add Employee
                </Button>
              </Alert>
              <ListCustomSearch
                refreshUserList={refreshSuccess}
                addEmpSuccessMsg={addSuccessMsg}
                deleteAddSuccessMsg={deleteAddSuccessMsg}
              />
            </Col>
          </Row>
        </div>
      </Container>
      {employeeModalShow && (
        <EmployeeModal
          showEmployeeModal={()=>{setEmployeeModalShow(true)}}
          closeEmployeeModal={()=>{setEmployeeModalShow(false)}}
          refreshListData={refreshList}
          modalTitle="Add Employee"
        />
      )}
    </Fragment>
  );
};

export default Employees;
