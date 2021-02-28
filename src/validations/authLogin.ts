import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(4, 'A senha precisa ter pelo menos 4 dígitos')
    .required('Senha é obrigatória'),
});

export default LoginSchema;
