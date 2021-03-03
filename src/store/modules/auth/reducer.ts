import produce, { Draft } from 'immer';

import type { AuthAction, AuthState } from './types';

const INITIAL_STATE: AuthState = {
  token: '',
  signed: false,
  loading: false,
  profile: {},
};

export default function auth(state = INITIAL_STATE, action: AuthAction) {
  return produce(state, (draft: Draft<AuthState>) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.loading = false;
        draft.token = '';
        draft.signed = false;
        draft.profile = {};
        break;
      }
      case '@auth/CANCEL_LOADING': {
        draft.loading = false;
        break;
      }
      case '@auth/SAVE_PROFILE': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SET_SIGNED': {
        draft.signed = true;
        break;
      }
      default:
    }
  });
}
