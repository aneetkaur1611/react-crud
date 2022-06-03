import BootstrapSwitchButton from "bootstrap-switch-button-react";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";

import InputField from "../../../components/InputField/InputField";
import EmployeeDataService from "../../../services/EmployeeService";
import { decimalCond } from "../../../utils/validation";

const EmployeeModal = ({ showEmployeeModal, closeEmployeeModal, updateListData }) => {
  const [employeeData, setEmployeeData] = useState({
    empName: "",
    email: "",
    dob: "",
    salary: "",
    workStatus: false,
  });

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [salaryError, setSalaryError] = useState("");
  const handleChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setEmployeeData({ ...employeeData, [nameInput]: valueInput });
    // Decimal validation
   // const salary = employeeData.salary;
    if (nameInput == "salary") {
      console.log("valueInput", valueInput)
      if (!decimalCond.test(valueInput)) {
        setSalaryError("Enter decimal value");
      } else {
        setSalaryError("");
      }
    }
  };
  const checkSalaryValidation = () => {
    setSalaryError("");
    let isValid = true;
    if (!decimalCond.test(employeeData.salary)) {
      setSalaryError("Enter decimal value");
      isValid = false;
    } else {
      setSalaryError("");
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const isValid = checkSalaryValidation();
    if (
      !employeeData.empName ||
      !employeeData.email ||
      !employeeData.dob ||
      !employeeData.salary && !isValid
    ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newEmployee = {
      empName: employeeData.empName,
      email: employeeData.email,
      dob: employeeData.dob,
      salary: employeeData.salary,
      workStatus: employeeData.workStatus,
    };

    try {
      await EmployeeDataService.addEmployees(newEmployee);
      setMessage({ error: false, msg: "New Employee added successfully!" });

    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setEmployeeData({
      empName: "",
      email: "",
      dob: "",
      salary: "",
      workStatus: false,
    });
    
    closeEmployeeModal();
    updateListData();
    
  };
  return (
    <Modal
      show={showEmployeeModal}
      size="md"
      centered
      onHide={closeEmployeeModal}
    >
      <ModalHeader className="bg-primary">
        <h3 className="text-white">Add Employee</h3>
        <span className="close" onClick={closeEmployeeModal}>
          &times;
        </span>
      </ModalHeader>
      <ModalBody>
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <Form onSubmit={handleEmployeeSubmit}>
          <InputField
            label="Name"
            type="text"
            name="empName"
            onChange={handleChange}
            value={employeeData.empName ?? ""}
          />
          <InputField
            label="Email Address"
            type="email"
            name="email"
            onChange={handleChange}
            value={employeeData.email ?? ""}
          />
          <InputField
            label="Date of Birth"
            type="date"
            name="dob"
            onChange={handleChange}
            value={employeeData.dob ?? ""}
          />
          <FormGroup className="mb-4 pb-2">
            <FormLabel className="font-bold mr-4 ">Salary</FormLabel>
            <InputGroup>
              <InputGroup.Text>Rs</InputGroup.Text>
              <FormControl
                value={employeeData.salary ?? ""}
                onChange={handleChange}
                name="salary"
                type="text"
                maxLength="10"
              />
            </InputGroup>
            {salaryError && (
              <small className="text-danger">{salaryError}</small>
            )}
          </FormGroup>
          <FormGroup className="mb-4">
            <FormLabel className="font-bold me-4 ">Work Status</FormLabel>
            <BootstrapSwitchButton
              width={100}
              offstyle="secondary"
              onlabel="At Work"
              onstyle="success"
              offlabel="Off"
              value={employeeData.workStatus ?? ""}
              checked={employeeData.workStatus}
              onChange={(checked) => {
                employeeData.workStatus = checked;
                setEmployeeData(employeeData);
              }}
            />
          </FormGroup>
          <Button type="submit" className="w-100 mb-3" >
            Add Employee
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EmployeeModal;
