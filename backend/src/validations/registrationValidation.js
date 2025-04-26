const validateEmail = (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'E-mail inválido';
  }
};

const validateName = (name) => {
  if (name && name.trim().length < 2) {
    return `Campo Nome/Razão Social deve ter no mínimo 2 caracteres`;
  }
};

const validateCpf = (cpf) => {
  if (cpf && !/^\d{11}$/.test(cpf)) {
    return `Campo Cpf deve ter 11 dígitos`;
  }
};

const validateCnpj = (cnpj) => {
  if (cnpj && !/^\d{14}$/.test(cnpj)) {
    return `Campo Cnpj deve ter 14 dígitos`;
  }
};

export const validateRegistration = (data) => {
  const validations = [
    { field: 'email', validator: validateEmail },
    { field: 'name', validator: validateName },
    { field: 'company', validator: validateName },
    { field: 'cpf', validator: validateCpf },
    { field: 'cnpj', validator: validateCnpj },
  ];

  return validations.reduce((errors, { field, validator }) => {
    const error = validator(data[field]);
    return error ? [...errors, error] : errors;
  }, []);
};