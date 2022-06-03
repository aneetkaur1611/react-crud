import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmployeeDataService from "../../../services/EmployeeService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee, faTrain, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import { async } from "@firebase/util";

const List = ({updateUserList}) => {




  console.log(updateUserList);
  const [employeesList, setEmployeesList] = useState([]);
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  const [deleteFlag, setDeleteFlag]= useState("");

  useEffect(() => {
    
    getEemployeesList();
  }, [updateUserList]);
  const getEemployeesList = async () => {
    try {
      const employesstData = await EmployeeDataService.getAllEmployess();
      // console.log(employesstData.docs);
      setEmployeesList(
        employesstData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log("Error Message");
    }
  };

  const handleCloseModal = async () => {
   
    setEmployeeModalShow(false);
  }
  const deleteHandler = async () => {
   // console.log("hello", deleteFlag)
    await EmployeeDataService.deleteEmployee(deleteFlag);
    getEemployeesList();
    setEmployeeModalShow(false);
  };
  return (
    <>
      {/* <pre>{JSON.stringify(employeesList, undefined, 2)}</pre> */}
      <Table responsive="sm" hover bordered>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th> Id</th>
            <th> Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>At Work</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesList.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center align-middle">{index + 1}</td>
                <td className="align-middle">{item.id}</td>
                <td className="align-middle">{item.empName}</td>
                <td className="align-middle">{item.email}</td>
                <td className="align-middle">{item.dob}</td>
                <td className="align-middle">{item.salary}</td>
                <td className="align-middle">
                  {item.workStatus == false ? "No" : "Yes"}
                </td>
                <td className="align-middle">
                  <ButtonGroup className="mb-2">
                    <Link to="#" className="btn btn-success">
                    <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to="#" className="btn btn-secondary">
                    <FontAwesomeIcon icon={faEdit} />
                    </Link>

                    <Button
                      variant="danger"
                      type="submit"
                      onClick={() => {setEmployeeModalShow(true)
                        setDeleteFlag(item.id)}}  
                    // onClick={(e) => deleteHandler(item.id)}
                    >
                
                    <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {employeeModalShow && (
        <DeleteEmployeeModal showDeleteEmployeeModal={() => setEmployeeModalShow(true)} 
        closeDeleteEmployeeModal={handleCloseModal} 
        deleteEmployee={deleteHandler}
        />
      )}
    </>
  );
};

export default List;
