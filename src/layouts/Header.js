import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useUserAuth } from "../utils/context/UserAuthContext";

const Header = () => {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState("");
  const { user, logOut } = useUserAuth();
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       //  console.log(user);
  //       setIsLoggedIn(user.email);
  //     } else {
  //       setIsLoggedIn("");
  //     }
  //   });
  // }, []);
  const handleSignout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  // const handleSignout = async () => {
  //   try {
  //     await logOut()
  //   }
  //   catch (err){
  //     console.log(err.message);
  //   }
  //   // const auth = getAuth();
  //   // signOut(auth)
  //   //   .then(() => {
  //   //     // Sign-out successful.
  //   //     navigate("/");
  //   //   })
  //   //   .catch((error) => {
  //   //     // An error happened.
  //   //     console.log(error);
  //   //   });
  // };
  const handleBtnDefault = () => {
    document.body.classList.remove("large");
    document.body.classList.remove("extra-large");
  };
  const handleBtnLarge = () => {
    document.body.classList.remove("extra-large");
    document.body.classList.add("large");
  };
  const handleBtnExtraLarge = () => {
    document.body.classList.remove("large");
    document.body.classList.add("extra-large");
  };
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container>
          <Link to="/" className="navbar-brand">
            React API
          </Link>
          <Nav>
            {!user ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/employees" className="nav-link">
                  Employees
                </Link>
                <span onClick={handleSignout} className="nav-link">
                  Signout
                </span>
                
              </>
            )}
          </Nav>
          <div className="button-box d-none">
            <span className="font-default" onClick={handleBtnDefault}>
              A
            </span>
            <span className="font-large" onClick={handleBtnLarge}>
              A
            </span>
            <span className="font-extra-large" onClick={handleBtnExtraLarge}>
              A
            </span>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
