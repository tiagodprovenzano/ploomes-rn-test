import { action } from 'typesafe-actions';
import { IContactsPhones } from '@ploomes/ploomeststypes';

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
  name: string | undefined,
  email: string | undefined,
  skype: string | undefined,
  birthday: string,
  cpf: string | undefined,
  phoneNumber: string | IContactsPhones[],
  originId: string | number | undefined,
  typeId: string | number | undefined,
  zipCode: string | number,
  streetAddress: string,
  streetAddressNumber: string,
  streetAddressLine2: string,
  neighborhood: string,
  cityId: number | undefined,
  stateId: number | undefined,
  countryId: number | undefined,
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

export function updateContactRequest(newProfile: object, contactId: number | undefined) {
  return action('@contacts/UPDATE_CONTACT_REQUEST', {newProfile, contactId});
}

export function updateContactSuccess(editingContact: []) {
  return action ('@contacts/UPDATE_CONTACT_SUCCESS', {editingContact});
}

export function getOriginContactRequest(originContactId: string) {
  return action('@contacts/GET_ORIGIN_CONTACT_REQUEST', {originContactId});
}

export function getOriginContactSuccess(contactOrigin: []) {
  return action('@contacts/GET_ORIGIN_CONTACT_SUCCESS', {contactOrigin});
}

export function getTypeContactRequest(typeContactId: string) {
  return action('@contacts/GET_TYPE_CONTACT_REQUEST', {typeContactId});
}

export function getTypeContactSuccess(contactType: []) {
  return action('@contacts/GET_TYPE_CONTACT_SUCCESS', {contactType});
}

export function getEditingContactRequest(contactId: string) {
  return action('@contacts/GET_EDITING_CONTACT_REQUEST', {contactId});
}

export function getEditingContactSuccess(editingContact: []) {
  return action('@contacts/GET_EDITING_CONTACT_SUCCESS', {editingContact});
}
