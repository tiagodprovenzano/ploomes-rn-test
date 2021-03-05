import * as yup from 'yup';

const ContactsSchema = yup.object().shape({
  name: yup.string().required('O Nome é obrigatório'),
  skype: yup.string(),
  email: yup
    .string()
    .required('O E-mail é obrigatório')
    .trim()
    .email('Digite um E-mail válido'),
  zipCode: yup
    .string()
    .min(8, 'O CEP precisa ter 8 dígitos'),
});

export default ContactsSchema;
