import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const senhaRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, senhaRef.current.value);
      history.push("/");
    } catch {
      setError("Email ou senha invalido");
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
              <h2 className="text-center mb-4">Login</h2>
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
                <Button disabled={loading} className="w-100" type="submit">
                  Login
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/esqueci-senha">Esqueci minha senha</Link>
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
