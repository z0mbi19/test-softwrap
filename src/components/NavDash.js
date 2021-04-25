/* eslint-disable react/prop-types */
import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/AuthContext";

export default function NavDash() {
  const { currentUser, logout } = useAuth();

  const history = useHistory();
  async function handkeLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      toast.warn("Varifique sua internet");
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">{currentUser.email}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Link to="update-user" className="btn btn-primary mr-3">
            {"Alterar Perfil "}
            <i className="fas fa-marker"></i>
          </Link>
          <Button variant="danger" onClick={handkeLogout}>
            {"Sair "}
            <i className="fas fa-door-open"></i>
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
