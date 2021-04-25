/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Card, Row, Col, Alert, Form } from "react-bootstrap";
import ReactInputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";

import firebase from "../firebase";

export default function FormDash({ currentUser }) {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [cidade, setCidade] = useState();
  const [cpf, setCpf] = useState();
  const [estadoCivil, setEstadoCivil] = useState();
  const [estado, setEstado] = useState();

  const createDados = async (dados) => {
    try {
      await firebase.database().ref("/Tabela").push(dados);
      toast.success("🎉 Criado com sucesso 😎");
    } catch {
      toast.warn("Varifique sua internet");
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (cpf.split("_").length > 1) {
      return toast.warning("Cpf incompleto ");
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
      <Card>
        <Card.Body>
          <h2>Cadastrar na Pabela</h2>
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
                    required
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
                    required
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
    </>
  );
}
