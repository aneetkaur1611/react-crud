import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";
import EmployeeDataService from "../../../services/EmployeeService";

const DeleteEmployeeModal = ({ deleteEmployee, showDeleteEmployeeModal, closeDeleteEmployeeModal }) => {


  return (
    <Modal
      show={showDeleteEmployeeModal}
      size="md"
      centered
      onHide={closeDeleteEmployeeModal}
    >
      <ModalHeader className="bg-primary justify-content-center">
        <h3 className="text-white text-center">Delete Employee</h3>
        <span className="close" onClick={closeDeleteEmployeeModal}>
          &times;
        </span>
      </ModalHeader>
      <ModalBody className="text-center py-5">
        <h3>Are you sure !</h3>
        <p>Do you want to delete Employee?</p>
     
          <Button type="submit" className="mx-3" variant="danger" onClick={deleteEmployee}>
            Delete
          </Button>
          <Button type="submit"  variant="outline-primary" onClick={closeDeleteEmployeeModal}>
            Cancel
          </Button>
      </ModalBody>
    </Modal>
  );
};

export default DeleteEmployeeModal;
