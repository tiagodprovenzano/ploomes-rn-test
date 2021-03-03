import { action } from 'typesafe-actions';

export function createContactRequest(
  name: string,
  neighborhood: string,
  zipCode: string,
  originId: string,
  companyId: string,
  streetAddressNumber: string,
  typeId: string,
  phoneNumber: string,
  phoneTypeId: number,
  countryId: number,
  fieldKey: string,
  stringValue: number,
) {
  return action('@contacts/CREATE_CONTACT_REQUEST', {
    name,
    neighborhood,
    zipCode,
    originId,
    companyId,
    streetAddressNumber,
    typeId,
    phoneNumber,
    phoneTypeId,
    countryId,
    fieldKey,
    stringValue,
  });
}

export function createContactSuccess() {
  return action('@contacts/CREATE_CONTACT_SUCCESS');
}

export function cancelLoading() {
  return action('@contacts/CANCEL_LOADING');
}
getCitiesRequest


export function getCitiesRequest(cityName: string) {
  return action('@contacts/GET_CITIES_REQUEST', {cityName});
}

export function getCitiesSuccess(locale: object) {
  return action('@contacts/GET_CITIES_SUCCESS', {locale});
}


// export function saveProfile(profile: object) {
//   return action('@contacts/SAVE_PROFILE', { profile });
// }

// export function setSigned() {
//   return action('@contacts/SET_SIGNED');
// }

// export function requestCreateProfile(
//   photoUrl: string,
//   name: string,
//   doc: string,
//   email: string,
//   birthdateValid: string,
//   phoneNumber: string,
//   address: string,
//   number: string,
//   complement: string,
//   neighborhood: string,
//   state: string,
//   city: string,
//   cep: string,
//   password: string,
//   fcmToken: string
// ) {
//   return action('@contacts/REQUEST_CREATE_PROFILE', {
//     photoUrl,
//     name,
//     doc,
//     email,
//     birthdateValid,
//     phoneNumber,
//     address,
//     number,
//     complement,
//     neighborhood,
//     state,
//     city,
//     cep,
//     password,
//     fcmToken,
//   });
// }
