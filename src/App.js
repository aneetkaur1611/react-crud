import Home from "./pages/Home";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signUp";
import { Navigate, Route, Routes } from "react-router-dom";

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
import EmployeeDetail from "./pages/Employees/components/EmployeeDetail";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { UserAuthContextProvider } from "./utils/context/UserAuthContext";

function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState("");
//   const [isLoggedInStatus, setIsLoggedInStatus] = useState(false);
//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         setIsLoggedIn(user.email);
//         setIsLoggedInStatus(true);
//       } else {
//         setIsLoggedIn("");
//         setIsLoggedInStatus(false);
//       }
//     });
//   }, []);
//  //console.log(isLoggedInStatus);
  return (
    <UserAuthContextProvider>
    <TheLayout>
      <Routes>     
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginFirebase />} />
          <Route path="/register" element={<SignUpFirebase />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path="/login-old" element={<Login />} />
        <Route path="/register-old" element={<SignUp />} />
        <Route path="/students" element={<Students />} />
        <Route path="/studentdetail/:id" element={<StudentDetail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/employeedetail/:id" element={<EmployeeDetail />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/authpage" element={<AuthPage />} />
      </Routes>
      
    </TheLayout>
    </UserAuthContextProvider>
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

const AuthPage = () => {
  return (
    <Container>
      <div className="text-center mt-5">
        <h1> You are already logged in</h1>
      </div>
    </Container>
  );
};
