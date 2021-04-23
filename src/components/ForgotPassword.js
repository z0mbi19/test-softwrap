import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [menssage, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Verifique a sua caixa de email para mais instruções");
    } catch {
      setError("Erro em resetar a senha");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Redefinir senha</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {menssage && <Alert variant="success">{menssage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Redefinir senha
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/login">Retornar para o login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Não tem cadastro? <Link to="signup">Cadastrar</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
