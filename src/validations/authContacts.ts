import * as yup from 'yup';

import DocHelper from '../helpers/docValidate';

const ContactsSchema = yup.object().shape({
  doc: yup
    .string()
    .required('O CPF é obrigatório')
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
  email: yup
    .string()
    .trim()
    .email('Digite um E-mail válido')
    .required('O E-mail é obrigatório'),
  neighborhood: yup
    .string()
    .required('Bairro é obrigatório'),
  zipCode: yup
    .string()
    .min(8, 'O CEP precisa ter 8 dígitos')
    .required('Cep é obrigatório'),
  origemId: yup
    .string()
    .required('Origem do contato é obrigatório'),
  phone: yup
    .string()
    .min(10, 'O CEP precisa ter no mínimo 10 dígitos')
    .max(11, 'O CEP precisa ter no máximo 11 dígitos')
    .required('Origem do contato é obrigatório'),
  phoneTypeId: yup
    .string()
    .required('Origem do contato é obrigatório'),
  contactType: yup
    .string()
    .required('Tipo do contato é obrigatório'),

});

export default ContactsSchema;

// "Name": "Pessoa Nova",
//     "Neighborhood": "Pinheiros",
//     "ZipCode": 0,
//     "OriginId": 0,
//     "CompanyId": null,
//     "StreetAddressNumber": "XXX",
//     "TypeId": 0,
//     "Phones": [
//         {
//             "PhoneNumber": "(XX) XXXX-XXXX",
//             "TypeId": 0,
//             "CountryId": 0
//         }
//     ],
//     "OtherProperties": [
//         {
//             "FieldKey": "{fieldKey}",
//             "StringValue": "texto exemplo"
//         },
//         {
//             "FieldKey": "{fieldKey}",
//             "IntegerValue": 2
//         }
//     ]
// }
