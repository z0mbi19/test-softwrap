import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import TableDash from "./TableDash";
import NavDash from "./NavDash";
import FormDash from "./FormDash";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <>
      <ToastContainer />
      <NavDash />
      <Container
        className="d-flex mt-4 justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ minWidth: "100px" }}>
          <FormDash currentUser={currentUser} />
          <div className="w-100 text-center mt-2">
            <TableDash user={currentUser} />
          </div>
        </div>
      </Container>
    </>
  );
}
