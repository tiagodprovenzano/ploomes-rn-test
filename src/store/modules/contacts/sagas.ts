import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { userKey } from "../../../config";

import type { ActionType } from 'typesafe-actions';

import api from '../../../services/api';
import NavigationService from '../../../helpers/navigation';

import {
  getContactsRequest,
  getContactsSuccess,
  getEditingContactRequest,
  getEditingContactSuccess,
  createContactRequest,
  createContactSuccess,
  updateContactRequest,
  updateContactSuccess,
  deleteContactRequest,
  deleteContactSuccess,
  getOriginsContactsSuccess,
  getTypesContactsSuccess,
  getOriginContactRequest,
  getOriginContactSuccess,
  getTypeContactRequest,
  getTypeContactSuccess,
  getCitiesRequest,
  getCitiesSuccess,
  cancelLoading,
} from './actions';

import { availableButtons } from '../commons/actions';

export function* getContacts() {
  try {
    const response = yield call(
      api.get, 'Contacts', {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {

      yield put(getContactsSuccess(response.data.value));

    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* getEditingContact({ payload }: ActionType<typeof getEditingContactRequest>) {
  try {
    const { contactId} = payload;

    const response = yield call(
      api.get, `Contacts?$filter=Id+eq+${contactId}`, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getEditingContactSuccess(response.data.value));
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* createContact({ payload }: ActionType<typeof createContactRequest>) {
  try {

    const data = {
      AvatarUrl: payload.avatarUrl,
      Name: payload.name,
      Email: payload.email,
      Skype: payload.skype,
      Birthday: payload.birthday,
      CPF: payload.cpf,
      Phones: [
        {
          PhoneNumber: payload.phoneNumber,
          TypeId: payload.typeId,
          CountryId: payload.countryId,
        }
      ],
      OriginId: payload.originId,
      TypeId: payload.typeId,
      ZipCode: payload.zipCode,
      StreetAddress: payload.streetAddress,
      StreetAddressNumber: payload.streetAddressNumber,
      StreetAddressLine2: payload.streetAddressLine2,
      Neighborhood: payload.neighborhood,
      CityId: payload.cityId,
      StateId: payload.stateId,
      CountryId: payload.countryId,
    };

    const response = yield call(
      api.post, "Contacts", data, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(availableButtons(true));
      yield put(cancelLoading());
      yield put(createContactSuccess());
      yield put(getContactsRequest());
      Alert.alert(
        "Parabéns!",
        "Contato cadastrado com sucesso."
      );
    }
  } catch (error) {
    yield put(availableButtons(true));
    yield put(cancelLoading());
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* updateContact({ payload }: ActionType<typeof updateContactRequest>) {
  try {
    const {newProfile, contactId} = payload;

    const data = newProfile;

    const response = yield call(
      api.put, `Contacts(${contactId})`, data, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getContactsRequest());
      yield put(updateContactSuccess([]));
      NavigationService.navigate({ routeName:'Contatos' });
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* deleteContact({ payload }: ActionType<typeof deleteContactRequest>) {
  try {
    const {contactId} = payload;

    const response = yield call(
      api.delete, `Contacts(${contactId})`, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(deleteContactSuccess());
      yield put(getContactsRequest());
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* getOriginsContacts() {
  try {
    const response = yield call(
      api.get, 'Contacts@Origins', {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getOriginsContactsSuccess(response.data.value));
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* getTypesContacts() {
  try {
    const response = yield call(api.get, 'Contacts@Types', {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getTypesContactsSuccess(response.data.value));
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* getCity({
  payload,
}: ActionType<typeof getCitiesRequest>) {
  try {
    const response = yield call(
      api.get,
      `Cities?$filter=Name+eq+'${payload.cityName}'`, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(availableButtons(true));
      yield put(cancelLoading());
      yield put(getCitiesSuccess(response.data.value[0]));
    }
  } catch (error) {
    yield put(availableButtons(true));
    yield put(cancelLoading());
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* getOriginContact({ payload }: ActionType<typeof getOriginContactRequest>) {
  try {
    const {originContactId} = payload;

    const response = yield call(
      api.get, `Contacts@Origins?$filter=Id+eq+${originContactId}`, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getOriginContactSuccess(response.data.value));
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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

export function* getTypeContact({ payload }: ActionType<typeof getTypeContactRequest>) {
  try {

    const {typeContactId} = payload;

    const response = yield call(
      api.get, `Contacts@Types?$filter=Id+eq+${typeContactId}`, {
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getTypeContactSuccess(response.data.value));
    }
  } catch (error) {
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
            "Verifique os dados e/ou faça Login novamente."
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
  takeLatest('@contacts/GET_CONTACTS_REQUEST', getContacts),
  takeLatest('@contacts/GET_EDITING_CONTACT_REQUEST', getEditingContact),
  takeLatest('@contacts/CREATE_CONTACT_REQUEST', createContact),
  takeLatest('@contacts/UPDATE_CONTACT_REQUEST', updateContact),
  takeLatest('@contacts/DELETE_CONTACTS_REQUEST', deleteContact),
  takeLatest('@contacts/GET_ORIGINS_CONTACTS_REQUEST', getOriginsContacts),
  takeLatest('@contacts/GET_TYPES_CONTACTS_REQUEST', getTypesContacts),
  takeLatest('@contacts/GET_CITIES_REQUEST', getCity),
  takeLatest('@contacts/GET_ORIGIN_CONTACT_REQUEST', getOriginContact),
  takeLatest('@contacts/GET_TYPE_CONTACT_REQUEST', getTypeContact),
]);
