import { action } from 'typesafe-actions';

export function signInRequest(
  email: string,
  password: string,
) {
  return action('@auth/SIGN_IN_REQUEST', { email, password });
}

export function signInSuccess(token: string) {
  return action('@auth/SIGN_IN_SUCCESS', { token });
}

export function signInFailure() {
  return action('@auth/SIGN_IN_FAILURE');
}

export function signOut() {
  return action('@auth/SIGN_OUT');
}

export function cancelLoading() {
  return action('@auth/CANCEL_LOADING');
}

export function saveProfile(profile: object) {
  return action('@auth/SAVE_PROFILE', { profile });
}

export function setSigned() {
  return action('@auth/SET_SIGNED');
}
