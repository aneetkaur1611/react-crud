import Home from "./pages/Home";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signUp";
import { Route, Routes } from "react-router-dom";
import TheLayout from "./layouts/TheLayout";
import { Container } from "react-bootstrap";
import Students from "./pages/Students";
import StudentDetail from "./pages/Students/components/StudentDetail";
import Edit from "./pages/Students/components/Edit";
import LoginFirebase from "./pages/Auth/FirebaseAuth/LoginFirebase";
import SignUpFirebase from "./pages/Auth/FirebaseAuth/SignUpFirebase";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Employees from "./pages/Employees";

function App() {
const [isLoggedIn, setIsLoggedIn ]  = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(user.email )
      }
    else{
      setIsLoggedIn("")
    }
    })
  }, [])
  return (
    <TheLayout>
      <Routes>
        <Route exact path="/" element={<Home name={isLoggedIn} />} />
        <Route path="/login" element={<LoginFirebase  />} />
        <Route path="/register" element={<SignUpFirebase />} />
        <Route path="/login-old" element={<Login />} />
        <Route path="/register-old" element={<SignUp />} />
        <Route path="/students" element={<Students />} />
        <Route path="/studentdetail/:id" element={<StudentDetail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </TheLayout>
  );
}

export default App;

const PageNotFound = () => {
  return (
    <Container>
      <div className="text-center mt-5">
        <h1> Page Not Found</h1>
        <p>This page is not found</p>
      </div>
    </Container>
  );
};
