import produce, { Draft } from 'immer';

import type { ContactsAction, ContactsState } from './types';

const INITIAL_STATE: ContactsState = {
  loading: false,
  contacts: [],
  locale: {},
  contactsOrigins: [],
  contactsTypes: [],
  contactOrigin: [],
  contactType: [],
  editingContact: [],
};

export default function auth(state = INITIAL_STATE, action: ContactsAction) {
  return produce(state, (draft: Draft<ContactsState>) => {
    switch (action.type) {
      case '@contacts/GET_CONTACTS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@contacts/GET_CONTACTS_SUCCESS': {
        draft.loading = false;
        draft.contacts = action.payload.contacts;
        break;
      }
      case '@contacts/CREATE_CONTACT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@contacts/CREATE_CONTACT_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@contacts/CANCEL_LOADING': {
        draft.loading = false;
        break;
      }
      case '@contacts/GET_ORIGINS_CONTACTS_SUCCESS': {
        draft.contactsOrigins = action.payload.contactsOrigins;
        break;
      }
      case '@contacts/GET_TYPES_CONTACTS_SUCCESS': {
        draft.contactsTypes = action.payload.contactsTypes;
        break;
      }
      case '@contacts/GET_CITIES_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@contacts/GET_CITIES_SUCCESS': {
        draft.loading = false;
        draft.locale = action.payload.locale;
        break;
      }
      case '@contacts/GET_ORIGIN_CONTACT_SUCCESS': {
        draft.contactOrigin = action.payload.contactOrigin;
        break;
      }
      case '@contacts/GET_TYPE_CONTACT_SUCCESS': {
        draft.contactType = action.payload.contactType;
        break;
      }
      case '@contacts/GET_EDITING_CONTACT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@contacts/GET_EDITING_CONTACT_SUCCESS': {
        draft.loading = false;
        draft.editingContact = action.payload.editingContact;
        break;
      }
      case '@contacts/UPDATE_CONTACT_SUCCESS': {
        draft.loading = false;
        draft.editingContact = [];
        break;
      }
      default:
    }
  });
}
