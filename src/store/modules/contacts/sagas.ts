import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import axios from 'axios';

import type { ActionType } from 'typesafe-actions';
import type { StoreState } from '../../../store';

import api from '../../../services/api';
import NavigationService from '../../../helpers/navigation';

import {
  createContactRequest,
  createContactSuccess,
  getCitiesRequest,
  getCitiesSuccess,
  cancelLoading,
} from './actions';

import { availableButtons } from '../commons/actions';
import { userKey } from '../../../config';

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



export function* getCity({
  payload,
}: ActionType<typeof getCitiesRequest>) {
  try {
    const response = yield call(
      api.get,
      `Cities?$filter=Name+eq+'${payload.cityName}'`,
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





export default all([
  takeLatest('@contacts/CREATE_CONTACT_REQUEST', createContact),
  takeLatest('@contacts/GET_CITIES_REQUEST', getCity),
  // takeLatest('@contacts/REQUEST_CREATE_PROFILE', createProfile),
]);
