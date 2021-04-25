import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  Table,
  Card,
  Row,
  Col,
  Alert,
  Form,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import ReactInputMask from "react-input-mask";
import TableRow from "./TableRow";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [todoList, setTodoList] = useState();
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [cidade, setCidade] = useState();
  const [cpf, setCpf] = useState();
  const [estadoCivil, setEstadoCivil] = useState();
  const [estado, setEstado] = useState();
  const [pag, setPag] = useState(1);

  const history = useHistory();
  async function handkeLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("ERROR");
    }
  }

  useEffect(() => {
    const todoRef = firebase.database().ref("/Tabela");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        if (todos[id].uid === currentUser.uid) {
          todoList.push({ id, ...todos[id] });
        }
      }

      setTodoList(todoList);
    });
  }, []);

  const createDados = async (dados) => {
    try {
      await firebase.database().ref("/Tabela").push(dados);
      toast.success("Criado com sucesso");
    } catch {}
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    console.log(cpf.split("_"));

    if (cpf.split("_").length > 1) {
      return toast.warning("Cpf incompleto");
    }

    createDados({
      nome: nome,
      idade: idade,
      estadoCivil: estadoCivil,
      cpf: cpf,
      cidade: cidade,
      estado: estado,
      uid: currentUser.uid,
    });

    setEstadoCivil("");
    setEstado("");
    setNome("");
    setIdade("");
    setCidade("");
    setCpf("");
  };

  return (
    <>
      <ToastContainer />
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">{currentUser.email}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Link to="update-user" className="btn btn-primary mr-3">
            Alterar perfil
            <i className="fas fa-marker"></i>
          </Link>
          <Button variant="danger" onClick={handkeLogout}>
            Sair
            <i className="fas fa-door-open"></i>
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Container
        className="d-flex mt-4 justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ minWidth: "100px" }}>
          <Card>
            <Card.Body>
              <h2>Cadastrar na tabela</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handlesubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Idade</Form.Label>
                      <ReactInputMask
                        mask="99"
                        className="form-control"
                        type="text"
                        value={idade}
                        onChange={(e) => {
                          setIdade(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Estado Civil</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={estadoCivil}
                        onChange={(e) => {
                          setEstadoCivil(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>CPF</Form.Label>
                      <ReactInputMask
                        mask="999.999.999-99"
                        className="form-control"
                        type="text"
                        value={cpf}
                        onChange={(e) => {
                          setCpf(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        value={cidade}
                        onChange={(e) => {
                          setCidade(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={estado}
                        onChange={(e) => {
                          setEstado(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit">
                  Salvar <i className="far fa-save"></i>{" "}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            <Table striped bordered hover responsive="xl">
              <thead>
                <tr>
                  <th style={{ minWidth: "150px" }}>Nome</th>
                  <th style={{ minWidth: "60px" }}>Idade</th>
                  <th style={{ minWidth: "150px" }}>Estado Civil</th>
                  <th style={{ minWidth: "150px" }}>CPF</th>
                  <th style={{ minWidth: "150px" }}>Cidade</th>
                  <th style={{ minWidth: "150px" }}>Estado</th>
                  <th style={{ minWidth: "150px" }}>Atualizar</th>
                  <th style={{ minWidth: "150px" }}>Apagar</th>
                </tr>
              </thead>
              <tbody>
                {todoList ? (
                  todoList.map((todo, i) => (
                    <tr key={i}>
                      <TableRow data={todo} />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <Spinner animation="border" />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
}
