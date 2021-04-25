import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function UpdateProfile() {
  const emailRef = useRef();
  const senhaRef = useRef();
  const confirmarSenhaRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (senhaRef.current.value !== confirmarSenhaRef.current.value) {
      return setError("Senhas diferentes");
    }

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (senhaRef.current.value) {
      if (senhaRef.current.value.length < 6) {
        return setError("Senha muito curta tem que ter mais de 6 caracteres");
      }
      promises.push(updatePassword(senhaRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Erro em atualizar o cadastro verifique sua internet ");
      })
      .finally(() => {
        setLoading(false);
      });
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
              <h2 className="text-center mb-4">Atualizar usuario</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="senha">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    ref={senhaRef}
                    placeholder="Deixe em branco de não quiser alterar a senha"
                  />
                </Form.Group>
                <Form.Group id="confirmar-senha">
                  <Form.Label>Confirmar senha</Form.Label>
                  <Form.Control
                    type="password"
                    ref={confirmarSenhaRef}
                    placeholder="Deixe em branco de não quiser alterar a senha"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Atualizar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancelar</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
