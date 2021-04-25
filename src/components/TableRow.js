/* eslint-disable react/prop-types */
import { Button } from "bootstrap";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";

import firebase from "../firebase";

// eslint-disable-next-line react/prop-types
export default function TableRow({ data }) {
  const [nome, setNome] = useState(data.nome);
  const [idade, setIdade] = useState(data.idade);
  const [estadoCivil, setEstadoCivil] = useState(data.estadoCivil);
  const [cpf, setCpf] = useState(data.cpf);
  const [cidade, setCidade] = useState(data.cidade);
  const [estado, setEstado] = useState(data.estado);

  const onUpdate = async () => {
    const db = firebase.database().ref("/Tabela").child(data.id);
    const update = {
      nome: nome,
      idade: idade,
      estadoCivil: estadoCivil,
      cpf: cpf,
      cidade: cidade,
      estado: estado,
    };

    try {
      await db.update(update);
      toast.success("🎉 Alterado 🖋");
    } catch {}
  };

  const onDelete = async () => {
    const db = firebase.database().ref("/Tabela").child(data.id);

    try {
      await db.remove();
      toast.success("Apagado 💣 ");
    } catch {}

    console.log(data.id);
  };

  return (
    <>
      <td>
        <input
          className="form-control"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
      </td>
      <td>
        <ReactInputMask
          mask="99"
          className="form-control"
          value={idade}
          onChange={(e) => {
            setIdade(e.target.value);
          }}
        />
      </td>
      <td>
        <input
          className="form-control"
          value={estadoCivil}
          onChange={(e) => {
            setEstadoCivil(e.target.value);
          }}
        />
      </td>
      <td>
        <input
          className="form-control"
          value={cpf}
          onChange={(e) => {
            setCpf(e.target.value);
          }}
        />
      </td>
      <td>
        <input
          className="form-control"
          value={cidade}
          onChange={(e) => {
            setCidade(e.target.value);
          }}
        />
      </td>
      <td>
        <input
          className="form-control"
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
          }}
        />
      </td>
      <td>
        <button className="btn btn-warning my-2" onClick={onUpdate}>
          Atualizar <i className="fas fa-marker"></i>
        </button>
      </td>
      <td>
        <button className="btn btn-danger my-2" onClick={onDelete}>
          Deletar <i className="far fa-trash-alt"></i>
        </button>
      </td>
    </>
  );
}
