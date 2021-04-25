<Form ref={formRef} onSubmit={handleFormSubmit}>
  <Row>
    <Col>
      <label forHtml="nome" className="form-label">
        Nome
      </label>
      <Input name="nome" />
    </Col>
    <Col>
      <label forHtml="idade" className="form-label">
        Idade
      </label>
      <Input name="idade" inputMask="99" type="tel" />
    </Col>
    <Col>
      <label forHtml="estado-civil" className="form-label">
        Estado civil
      </label>
      <Input name="estado-civil" />
    </Col>
  </Row>
  <Row>
    <Col>
      <label forHtml="cpf" className="form-label">
        CPF
      </label>
      <Input name="cpf" inputMask="999.999.999-99" />
    </Col>
    <Col>
      <label forHtml="cidade" className="form-label">
        Cidade
      </label>
      <Input name="cidade" />
    </Col>
    <Col>
      <label forHtml="estado" className="form-label">
        Estado
      </label>
      <Input name="estado" />
    </Col>
  </Row>

  <button className="mt-3 btn btn-primary" type="submit">
    Salvar
  </button>
</Form>;
