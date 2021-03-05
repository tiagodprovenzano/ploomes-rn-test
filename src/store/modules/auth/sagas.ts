import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import type { ActionType } from 'typesafe-actions';

import api from '../../../services/api';

import {
  signInRequest,
  signInSuccess,
  signInFailure,
  saveProfile,
  setSigned,
  cancelLoading,
} from './actions';

import { availableButtons } from '../commons/actions';

import { getContactsRequest } from '../contacts/actions';

export function* signIn({ payload }: ActionType<typeof signInRequest>) {
  try {
    const response = yield call(
      api.post,
      "Self/Login", {
        // "Self/Login?$select=Id,Name,Email,UserKey,AvatarUrl,LinkedIn", {
        Email: payload.email,
        Password: payload.password,
      }
    );

    if (response.status === 200) {
      const { UserKey: token } = response.data.value[0];
      const profile = response.data.value[0];

      yield put(getContactsRequest());
      yield put(availableButtons(true));
      yield put(saveProfile(profile));
      yield put(signInSuccess(token));
      yield put(setSigned());
      yield put(cancelLoading());
    }
  } catch (error) {
    yield put(availableButtons(true));
    yield put(cancelLoading());
    yield put(signInFailure());
    if (error.response) {
      switch (error.response.status) {
        case 500:
          break;
        case 409:
          break;
        case 404:
          break;
        case 401:
          Alert.alert(
            "Opss, Erro ao efetuar o Login!",
            "Verifique os dados e tente novamente."
          );
          break;
        case 400:
          break;
        default:
          break;
      }
    }
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
