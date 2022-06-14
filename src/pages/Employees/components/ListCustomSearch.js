import React, { useEffect, useState, useRef } from "react";
import { ButtonGroup, Button, Alert, FormControl, Form } from "react-bootstrap";
import EmployeeDataService from "../../../services/EmployeeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import EmployeeModal from "./EmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import InputGroup from "react-bootstrap/InputGroup";

const ListCustomSearch = ({
  refreshUserList,
  addEmpSuccessMsg,
  deleteAddSuccessMsg,
}) => {
  const [employeesList, setEmployeesList] = useState([]);
  const [employeeModalShow, setEmployeeModalShow] = useState(false);
  const [empDeleteModalShow, setEmpDeleteeModalShow] = useState(false);
  const [empViewModalShow, setEmpViewModalShow] = useState(false);
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(false);
  const [editEmpSuccessMsg, setEditEmpSuccessMsg] = useState(false);
  const [empId, setEmpId] = useState("");
  const [customSearch, setCustomSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  ///Show Table Data
  const getEemployeesList = async () => {
    try {
      const employesstData = await EmployeeDataService.getAllEmployees();
      // console.log("List", employesstData);
      let empDataList = employesstData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployeesList(empDataList);
      setSearchResult(empDataList);
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
  };

  setTimeout(() => {
    // After 7 seconds set the show value to false
    setEditEmpSuccessMsg(false);
    setDeleteSuccessMsg(false);
  }, 7000);
  //console.log(editEmpSuccessMsg);

  ////Delete Employee
  const deleteHandler = async () => {
    await EmployeeDataService.deleteEmployee(empId);
    getEemployeesList();
    setEmpDeleteeModalShow(false);
    setDeleteSuccessMsg(true);
  };

  /////Action Button
  const actionFormatter = (employeesList, row) => {
    return (
      <ButtonGroup className="mb-2">
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
    hidePageListOnlyOnePage: true,
    paginationTotalRenderer: customTotal,
    prePageText: <FontAwesomeIcon icon={faChevronLeft} />,
    nextPageText: <FontAwesomeIcon icon={faChevronRight} />,
    sizePerPageList: [4], // A numeric array is also available. the purpose of above example is custom the text
  };

  const handleSearchChange = (event) => {
    let valueInput = event.target.value;
    setCustomSearch(valueInput);
    if (valueInput !== "") {
      let newEmpList = searchResult.filter((item) =>
        item.empName.toLowerCase().includes(valueInput.toLowerCase())
      );
      setEmployeesList(newEmpList); // 5
    } else {
      setEmployeesList([...searchResult]);
    }
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

      <>
        <div className="search-box my-5 ">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
                value={customSearch}
              />
            </InputGroup>
          </Form>
        </div>
        {employeesList?.length > 0 ? (
          <>
            <BootstrapTable
              hover
              bordered
              responsive
              keyField="id"
              data={employeesList}
              columns={columns}
              pagination={paginationFactory(paginationOptions)}
            />
          </>
        ) : (
          <h1 className="text-center mt-5">No Employee Found</h1>
        )}
      </>

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

export default ListCustomSearch;
