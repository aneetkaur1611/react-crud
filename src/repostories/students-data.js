import axios from "axios";

export const studentList = async () => {
    const students = await axios.get("http://localhost:3000/students");
    return students;
}