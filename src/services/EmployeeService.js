import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const employeeCollectionRef = collection(db, "Employees");
class EmployeeDataService {
  addEmployees = (newEmployee) => {
    return addDoc(employeeCollectionRef, newEmployee);
  };

  updateEmployee = (id, updatedEmployee) => {
    const employeeDoc = doc(db, "Employees", id);
    return updateDoc(employeeDoc, updatedEmployee);
  };

  deleteEmployee = (id) => {
    const employeeDoc = doc(db, "Employees", id);
    return deleteDoc(employeeDoc);
  };

  getAllEmployees = () => {
    return getDocs(employeeCollectionRef);
  };

  getEmployee = (id) => {
    const employeeDoc = doc(db, "Employees", id);
    return getDoc(employeeDoc);
  };

}

export default new EmployeeDataService();
