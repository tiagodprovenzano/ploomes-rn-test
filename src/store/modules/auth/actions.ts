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

export function signOutRequest() {
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

export function requestCreateProfile(
  photoUrl: string,
  name: string,
  doc: string,
  email: string,
  birthdateValid: string,
  phoneNumber: string,
  address: string,
  number: string,
  complement: string,
  neighborhood: string,
  state: string,
  city: string,
  cep: string,
  password: string,
  fcmToken: string
) {
  return action('@auth/REQUEST_CREATE_PROFILE', {
    photoUrl,
    name,
    doc,
    email,
    birthdateValid,
    phoneNumber,
    address,
    number,
    complement,
    neighborhood,
    state,
    city,
    cep,
    password,
    fcmToken,
  });
}
