import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const senhaRef = useRef();
  const confirmarSenhaRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (senhaRef.current.value !== confirmarSenhaRef.current.value) {
      return setError("Senhas diferentes");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, senhaRef.current.value);
    } catch {
      setError("Error em criar uma conta verifique sua internet");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Cadastrar</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="senha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={senhaRef} required />
            </Form.Group>
            <Form.Group id="confirmar-senha">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control type="password" ref={confirmarSenhaRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Você já esta cadastrado? Login
      </div>
    </>
  );
}
