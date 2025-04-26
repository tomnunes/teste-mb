export const formSections = [
  {
    title: "Seja bem-vindo(a)",
    fields: [
      {
        id: "email",
        name: "email",
        label: "Endereço de e-mail",
        type: "email",
        required: true
      },
      {
        id: "type-person",
        name: "type-person",
        type: "radio-group",
        options: [
          { id: "pessoa-fisica", label: "Pessoa física", value: "cpf" },
          { id: "pessoa-juridica", label: "Pessoa jurídica", value: "cnpj" }
        ],
        required: true
      }
    ]
  },
  {
    title: "Pessoa Física",
    fields: [
      { id: "name", name: "name", label: "Nome", type: "text", required: true },
      { id: "cpf", name: "cpf", label: "CPF", type: "text", required: true },
      { id: "dob", name: "dob", label: "Data de nascimento", type: "date", min:"1900-01-01", max:"2100-12-31", required: true },
      { id: "phone", name: "phone", label: "Telefone", type: "tel", pattern: "[0-9]{2} [0-9]{5}-[0-9]{4}", placeholder:"11 99999-9999", required: true }
    ]
  },
  {
    title: "Senha de acesso",
    fields: [
      { id: "password", name: "password", label: "Sua senha", type: "password", required: true }
    ]
  },
  {
    title: "Revise suas informações",
    fields: [
      { id: "email", name: "email", label: "Endereço de e-mail", type: "email", required: true },
      { id: "name", name: "name", label: "Nome", type: "text", required: true },
      { id: "cpf", name: "cpf", label: "CPF", type: "text", required: true },
      { id: "dob", name: "dob", label: "Data de nascimento", type: "date", min:"1900-01-01", max:"2100-12-31", required: true },
      { id: "phone", name: "phone", label: "Telefone", type: "tel", pattern: "[0-9]{2} [0-9]{5}-[0-9]{4}", placeholder:"11 99999-9999", required: true },
      { id: "password", name: "password", label: "Sua senha", type: "password", required: true }
    ]
  }
];

export const typeOfPersons = [
  formSections[1],
  {
    title: "Pessoa Jurídica",
    fields: [
      { id: "company", name: "company", label: "Razão social", type: "text", required: true },
      { id: "cnpj", name: "cnpj", label: "CNPJ", type: "text", required: true },
      { id: "doo", name: "doo", label: "Data de abertura", type: "date", min:"1900-01-01", max:"2100-12-31", required: true },
      { id: "phone", name: "phone", label: "Telefone", type: "tel", pattern: "[0-9]{2} [0-9]{5}-[0-9]{4}", placeholder:"11 99999-9999", required: true }
    ]
  }
];
