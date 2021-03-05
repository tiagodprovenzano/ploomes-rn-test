import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { userKey } from "../../../config";

import type { ActionType } from 'typesafe-actions';

import api from '../../../services/api';
import NavigationService from '../../../helpers/navigation';

import {
  getContactsRequest,
  getContactsSuccess,
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

export function* createContact({ payload }: ActionType<typeof createContactRequest>) {
  try {

    const {
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
    } = payload;



    const response = yield call(
      api.post,
      "Self/Login", {
        "Name": "Pessoa Nova",
        "Neighborhood": "Pinheiros",
        "ZipCode": 0,
        "OriginId": 0,
        "CompanyId": null,
        "StreetAddressNumber": "XXX",
        "TypeId": 0,
        "Phones": [
            {
                "PhoneNumber": "(XX) XXXX-XXXX",
                "TypeId": 0,
                "CountryId": 0
            }
        ],
        "OtherProperties": [
            {
                "FieldKey": "{fieldKey}",
                "StringValue": "texto exemplo"
            },
            {
                "FieldKey": "{fieldKey}",
                "IntegerValue": 2
            }
        ]
    }
    );

    if (response.status === 200) {
      yield put(availableButtons(true));
      yield put(cancelLoading());
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

export function* updateContact({ payload }: ActionType<typeof updateContactRequest>) {
  try {
    const {newProfile, contactId} = payload;

    console.tron.log(newProfile);


    const response = yield call(
      api.put, `Contacts(${contactId})`, {
        data: newProfile,
        headers: {
          "User-Key": userKey,
        },
      }
    );

    if (response.status === 200) {
      yield put(getContactsRequest());
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

export function* getTypesContacts() {
  try {
    const response = yield call(
      api.get, 'Contacts@Types', {
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
  takeLatest('@contacts/GET_CONTACTS_REQUEST', getContacts),
  takeLatest('@contacts/CREATE_CONTACT_REQUEST', createContact),
  takeLatest('@contacts/UPDATE_CONTACT_REQUEST', updateContact),
  takeLatest('@contacts/DELETE_CONTACTS_REQUEST', deleteContact),
  takeLatest('@contacts/GET_ORIGINS_CONTACTS_REQUEST', getOriginsContacts),
  takeLatest('@contacts/GET_TYPES_CONTACTS_REQUEST', getTypesContacts),
  takeLatest('@contacts/GET_CITIES_REQUEST', getCity),
  takeLatest('@contacts/GET_ORIGIN_CONTACT_REQUEST', getOriginContact),
  takeLatest('@contacts/GET_TYPE_CONTACT_REQUEST', getTypeContact),
  // takeLatest('@contacts/REQUEST_CREATE_PROFILE', createProfile),
]);
