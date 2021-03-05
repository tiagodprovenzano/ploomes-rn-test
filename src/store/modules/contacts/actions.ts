import { action } from 'typesafe-actions';

export function getContactsRequest() {
  return action('@contacts/GET_CONTACTS_REQUEST');
}

export function getContactsSuccess(contacts: []) {
  return action('@contacts/GET_CONTACTS_SUCCESS', {contacts});
}

export function deleteContactRequest(contactId: string) {
  return action('@contacts/DELETE_CONTACTS_REQUEST', {contactId});
}

export function deleteContactSuccess() {
  return action('@contacts/DELETE_CONTACTS_SUCCESS');
}

export function createContactRequest(
  avatarUrl: string,
  name: string,
  email: string,
  skype: string,
  birthday: string,
  cpf: string,
  phoneNumber: string,
  originId: string,
  typeId: string,
  zipCode: string,
  streetAddress: string,
  streetAddressNumber: string,
  streetAddressLine2: string,
  neighborhood: string,
  cityId: string,
  stateId: string,
  countryId: string,
) {
  return action('@contacts/CREATE_CONTACT_REQUEST', {
  avatarUrl,
  name,
  email,
  skype,
  birthday,
  cpf,
  phoneNumber,
  originId,
  typeId,
  zipCode,
  streetAddress,
  streetAddressNumber,
  streetAddressLine2,
  neighborhood,
  cityId,
  stateId,
  countryId,
  });
}

export function createContactSuccess() {
  return action('@contacts/CREATE_CONTACT_SUCCESS');
}

export function getOriginsContactsRequest() {
  return action('@contacts/GET_ORIGINS_CONTACTS_REQUEST');
}

export function getOriginsContactsSuccess(contactsOrigins: []) {
  return action('@contacts/GET_ORIGINS_CONTACTS_SUCCESS', {contactsOrigins});
}

export function getTypesContactsRequest() {
  return action('@contacts/GET_TYPES_CONTACTS_REQUEST');
}

export function getTypesContactsSuccess(contactsTypes: []) {
  return action('@contacts/GET_TYPES_CONTACTS_SUCCESS', {contactsTypes});
}

export function cancelLoading() {
  return action('@contacts/CANCEL_LOADING');
}

export function getCitiesRequest(cityName: string) {
  return action('@contacts/GET_CITIES_REQUEST', {cityName});
}

export function getCitiesSuccess(locale: object) {
  return action('@contacts/GET_CITIES_SUCCESS', {locale});
}

export function updateContactRequest(newProfile: object, contactId: string) {
  return action('@contacts/UPDATE_CONTACT_REQUEST', {newProfile, contactId});
}

export function updateContactSuccess() {
  return action ('@contacts/UPDATE_CONTACT_SUCCESS');
}

export function getOriginContactRequest(originContactId: string) {
  return action('@contacts/GET_ORIGIN_CONTACT_REQUEST', {originContactId});
}

export function getOriginContactSuccess(contactOrigin: []) {
  return action('@contacts/GET_ORIGIN_CONTACT_SUCCESS', {contactOrigin});
}

export function getTypeContactRequest(typeContactId: string) {
  return action('@contacts/GET_TYPE_CONTACTS_REQUEST', {typeContactId});
}

export function getTypeContactSuccess(contactType: []) {
  return action('@contacts/GET_TYPE_CONTACT_SUCCESS', {contactType});
}
