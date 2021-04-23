import React from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  Table,
  NavDropdown,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handkeLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("ERROR");
    }
  }
  console.log(currentUser);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{currentUser.email}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Link to="update-user" className="btn btn-primary mr-3">
            Alterar perfil
          </Link>
          <Button variant="danger" onClick={handkeLogout}>
            Log out
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Container
        className="d-flex mt-4 justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Estado Civil</th>
                <th>CPF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
