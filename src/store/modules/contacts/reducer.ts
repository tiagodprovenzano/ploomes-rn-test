import produce, { Draft } from 'immer';

import type { ContactsAction, ContactsState } from './types';

const INITIAL_STATE: ContactsState = {
  loading: false,
  contacts: [],
  locale: {},
  contactsOrigins: [],
  contactsTypes: [],
};

export default function auth(state = INITIAL_STATE, action: ContactsAction) {
  return produce(state, (draft: Draft<ContactsState>) => {
    switch (action.type) {
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
      // case '@contacts/SIGN_IN_SUCCESS': {
      //   draft.token = action.payload.token;
      //   draft.loading = false;
      //   break;
      // }
      // case '@contacts/SIGN_IN_FAILURE': {
      //   draft.loading = false;
      //   break;
      // }
      // case '@contacts/SIGN_OUT': {
      //   draft.token = '';
      //   draft.signed = false;
      //   draft.profile = {};
      //   break;
      // }
      // case '@contacts/SAVE_PROFILE': {
      //   draft.profile = action.payload.profile;
      //   break;
      // }
      // case '@contacts/SET_SIGNED': {
      //   draft.signed = true;
      //   break;
      // }
      default:
    }
  });
}
