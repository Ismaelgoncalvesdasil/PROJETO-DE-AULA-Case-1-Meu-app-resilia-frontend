import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'

const Nav = () =>(
  <Navbar expand="lg" bg="dark" variant="dark" className="
  d-flex
  align-items-start
  justify-content-center
  ">
    <div>
      <Link to={'/'}>Home</Link>
    </div>
    </Navbar>
)
export default Nav