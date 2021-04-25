import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import firebase from "../firebase";
import ReactPaginate from "react-paginate";

import TableRow from "./TableRow";

// eslint-disable-next-line react/prop-types
export default function TableDash({ user }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoRef = firebase.database().ref("/Tabela");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        // eslint-disable-next-line react/prop-types
        if (todos[id].uid === user.uid) {
          todoList.push({ id, ...todos[id] });
        }
      }

      setTodoList(todoList);
    });
  }, []);
  return (
    <>
      <Table striped bordered hover responsive="xl">
        <thead>
          <tr>
            <th style={{ minWidth: "150px" }}>Nome</th>
            <th style={{ minWidth: "60px" }}>Idade</th>
            <th style={{ minWidth: "150px" }}>Estado Civil</th>
            <th style={{ minWidth: "160px" }}>CPF</th>
            <th style={{ minWidth: "150px" }}>Cidade</th>
            <th style={{ minWidth: "100px" }}>Estado</th>
            <th style={{ minWidth: "150px" }}>Atualizar</th>
            <th style={{ minWidth: "150px" }}>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {todoList !== 0 ? (
            todoList.map((x, i) => (
              <tr key={i}>
                <TableRow data={x} />
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
    </>
  );
}
