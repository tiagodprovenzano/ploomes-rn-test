import * as yup from 'yup';

import DocHelper from '../helpers/docValidate';

const ContactsSchema = yup.object().shape({
  doc: yup
    .string()
    .min(14, 'O CPF precisa ter 14 dígitos')
    .max(14, 'O CPF precisa ter 14 dígitos')
    .test('doc', 'Digite um CPF válido', async (document: string): boolean => {
      if (document && document.length === 14) {
        const validDoc = DocHelper.validateDoc(document);

        if (validDoc) {
          return true;
        }
        return false;
      }
    }),
  name: yup.string().required('O Nome é obrigatório'),
  skype: yup.string(),
  email: yup
    .string()
    .trim()
    .email('Digite um E-mail válido'),
  zipCode: yup
    .string()
    .min(8, 'O CEP precisa ter 8 dígitos'),
});

export default ContactsSchema;
