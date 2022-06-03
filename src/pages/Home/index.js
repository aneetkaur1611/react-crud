import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = (props) => {
  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });

  return (
    <div className="home-banner">
      <Container>
        <div className="text-center my-4">
          

          {props.name ? (
            <>
            <h1>Welcome</h1>
            <h3 className="mt-2 mb-4 text-primary" >{props.name}</h3>
            <p> Time : {date.toLocaleTimeString('en-US', {  hour: '2-digit',
    minute: '2-digit', hour12: true })}<br />
             Date : {date.toLocaleDateString()}</p>
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
