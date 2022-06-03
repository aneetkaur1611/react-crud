import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { studentList } from "../../../repostories/students-data";
const List = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
   // async function getStudentList() {
      const getStudentList = async() =>{
      try {
        const studentData =  await studentList();
      //  console.log(studentData);
      //  const students = await axios.get("http://localhost:3000/students");

        setStudents(studentData.data);
      } catch (error) {
        console.log("Error Message");
      }
    }
    getStudentList();
    return () => {

    }
  }, [students]);
  
  const handleDeteBtn = async (id) => {
    if (window.confirm("Are you sure you want to delete data??")) {
      try {
        await axios.delete(`http://localhost:3000/students/${id}`); 
        let newList = students.filter((data) =>{
          return data.id !==id;
        })
        setStudents(newList);
      } 
      catch (error) {
        console.log("Error Message");
      }
    }
    
  }
 
  return (
    <Table responsive="sm" hover bordered>
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th> Name</th>
          <th>Email Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((item, index) => {
          return (
            <tr key={index}>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="align-middle">{item.studentName}</td>
              <td className="align-middle">{item.email}</td>
              <td className="align-middle">
                <ButtonGroup className="mb-2">
                <Link to={`/studentdetail/${item.id}`} className="btn btn-success">
                    View
                  </Link>
                  <Link to={`/edit/${item.id}`} className="btn btn-secondary">
                    Edit
                  </Link>

                  <Button variant="danger" onClick={() => handleDeteBtn(item.id)}> Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default List;
