import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmployeeDataService from "../../../services/EmployeeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import EmployeeModal from "./EmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const List = ({ refreshUserList, addEmpSuccessMsg, deleteAddSuccessMsg }) => {
  const [employeesList, setEmployeesList] = useState([]);
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  const [empDeleteModalShow, setEmpDeleteeModalShow] = useState(false);
  const [empViewModalShow, setEmpViewModalShow] = useState(false);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(false);
  const [editEmpSuccessMsg, setEditEmpSuccessMsg] = useState(false);
  const [empId, setEmpId] = useState("");

  ///Show Table Data
  const getEemployeesList = async () => {
    try {
      const employesstData = await EmployeeDataService.getAllEmployees();
      // console.log("List", employesstData);
      setEmployeesList(
        employesstData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log("Error Message", error);
    }
  };
  useEffect(() => {
    getEemployeesList();
  }, [refreshUserList]);
  ///
  const refreshEditList = () => {
    getEemployeesList();
    setEditEmpSuccessMsg(true);
    setTimeout(() => {
      // After 7 seconds set the show value to false
      setEditEmpSuccessMsg(false);
    }, 7000);
  };

  


  ////Delete Employee
  const deleteHandler = async () => {
    await EmployeeDataService.deleteEmployee(empId);
    getEemployeesList();
    setEmpDeleteeModalShow(false);

    setDeleteSuccessMsg(true);
  };
  const { SearchBar } = Search;
  /////Action Button
  const actionFormatter = (employeesList, row) => {
    return (
      <ButtonGroup className="mb-2">
        {/* <Link to={`/employeedetail/${row.id}`} className="btn btn-success">
          <FontAwesomeIcon icon={faEye} />
        </Link> */}
        <Button
          variant="success"
          onClick={() => {
            setEmpViewModalShow(true);
            setEmpId(row.id);
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            setEmployeeModalShow(true);
            setEmpId(row.id);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>

        <Button
          variant="danger"
          type="submit"
          onClick={() => {
            setEmpDeleteeModalShow(true);
            setEmpId(row.id);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </ButtonGroup>
    );
  };
  const columns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "empName",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "dob",
      text: "DOB",
    },
    {
      dataField: "salary",
      text: "Salary",
    },
    {
      dataField: "workStatus",
      text: "At Work",
      formatter: (employeesList, row) => {
        return <>{employeesList == true ? "yes" : "No"}</>;
      },
    },
    {
      dataField: "",
      text: "Actions",
      formatter: actionFormatter,
    },
  ];

  /////Pagination
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
  const paginationOptions = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
    hidePageListOnlyOnePage: true,
    prePageText: <FontAwesomeIcon icon={faChevronLeft} />,
    nextPageText: <FontAwesomeIcon icon={faChevronRight} />,
    sizePerPageList: [4], // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <>
      {/* <pre>{JSON.stringify(employeesList, undefined, 2)}</pre> */}
      {deleteSuccessMsg && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setDeleteSuccessMsg(false)}
        >
          Employee Deleted Successfully
        </Alert>
      )}
      {addEmpSuccessMsg && (
        <Alert variant="success" dismissible onClose={deleteAddSuccessMsg}>
          Employee Added Successfully
        </Alert>
      )}
      {editEmpSuccessMsg && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setEditEmpSuccessMsg(false)}
        >
          Employee Updated Successfully
        </Alert>
      )}
      <ToolkitProvider
        keyField="id"
        data={employeesList}
        columns={columns}
        search
      >
        {(props) => (
          <>
            <SearchBar {...props.searchProps} />
            {employeesList?.length > 0 ? (
              <BootstrapTable
                hover
                bordered
                responsive
                keyField="id"
                data={employeesList}
                columns={columns}
                pagination={paginationFactory(paginationOptions)}
                {...props.baseProps}
              />
            ) : (
              <h1 className="text-center mt-5">No Employee Found</h1>
            )}
          </>
        )}
      </ToolkitProvider>
      {empDeleteModalShow && (
        <DeleteEmployeeModal
          showDeleteEmployeeModal={() => {
            setEmpDeleteeModalShow(true);
          }}
          closeDeleteEmployeeModal={() => {
            setEmpDeleteeModalShow(false);
          }}
          deleteEmployee={deleteHandler}
        />
      )}
      {empViewModalShow && (
        <ViewEmployeeModal
          showViewEmployeeModal={() => {
            setEmpViewModalShow(true);
          }}
          closeViewEmployeeModal={() => {
            setEmpViewModalShow(false);
          }}
          viewEmpId={empId}
        />
      )}
      {employeeModalShow && (
        <EmployeeModal
          showEmployeeModal={() => {
            setEmployeeModalShow(true);
          }}
          closeEmployeeModal={() => {
            setEmployeeModalShow(false);
          }}
          modalTitle="Edit Employee"
          editEmpId={empId}
          setEditEmpId={setEmpId}
          refreshListData={refreshEditList}
        />
      )}
    </>
  );
};

export default List;
