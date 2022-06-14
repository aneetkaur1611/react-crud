import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "react-bootstrap";
import EmployeeService from "../../../services/EmployeeService";

const ViewEmployeeModal = ({
  showViewEmployeeModal,
  closeViewEmployeeModal,
  viewEmpId
}) => {
  const [empSingle, setEmpSingle] = useState({});
  useEffect(() => {
    const getEmpSingle = async () => {
      try {
        const empDataSingle = await EmployeeService.getEmployee(viewEmpId);
       // console.log("data:", empDataSingle.data());
        setEmpSingle(empDataSingle.data());

      } catch (error) {
        console.log("Error Message");
      }
    };
    getEmpSingle();
    //  console.log(getEmpSingle);
  }, [viewEmpId]);

  return (
    <Modal
      show={showViewEmployeeModal}
      size="md"
      centered
      onHide={closeViewEmployeeModal}
    >
      <ModalHeader className="bg-primary justify-content-center">
        <h3 className="text-white text-center">View Employee</h3>
        <span className="close" onClick={closeViewEmployeeModal}>
          &times;
        </span>
      </ModalHeader>
      <ModalBody className="py-5">
        <Table responsive="sm" hover bordered>
        <tbody>
          <tr>
            <th>Id</th>
            <td className="align-middle">{viewEmpId}</td>
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
      <div className="text-center">
        <Button
          type="submit"
          variant="primary"
          onClick={closeViewEmployeeModal}
        >
          Ok
        </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewEmployeeModal;
