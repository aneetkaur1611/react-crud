import React, { useEffect, useState } from "react";
import {Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../utils/context/UserAuthContext";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const {user} = useUserAuth();
  // console.log("Home", user)
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  },[]);

  return (
    <div className="home-banner">
      <Container>
        <div className="text-center my-4">
          {user ? (
            <>
              <h1>Welcome</h1>
              <h3 className="mt-2 mb-4 text-primary">{user && user.email}</h3>
              <p>
                Time :{" "}
                {date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                <br />
                Date : {date.toLocaleDateString()}
              </p>
            </>
          ) : (
            <>
              <h1> Home Page</h1>
              <p>Click login below:</p>
              <Link to="/Login" className="btn btn-primary">
                Login
              </Link>{" "}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
