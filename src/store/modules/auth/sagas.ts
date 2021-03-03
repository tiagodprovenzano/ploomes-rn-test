import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import axios from 'axios';

import type { ActionType } from 'typesafe-actions';
import type { StoreState } from '../../../store';

import api from '../../../services/api';
import NavigationService from '../../../helpers/navigation';

import {
  signInRequest,
  signInSuccess,
  signInFailure,
  saveProfile,
  setSigned,
  cancelLoading,
  requestCreateProfile,
  signOutRequest,
} from './actions';

import { availableButtons } from '../commons/actions';
import { userKey } from '../../../config';

export function* signIn({ payload }: ActionType<typeof signInRequest>) {
  try {
    const response = yield call(
      api.post,
      "Self/Login?$select=Id,Name,Email,UserKey,AvatarUrl", {
        Email: payload.email,
        Password: payload.password,
      }
    );

    console.tron.log(response.data.value[0])

    if (response.status === 200) {
      const { UserKey: token } = response.data.value[0];
      const profile = response.data.value[0];



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

// export function* signOut({}: ActionType<typeof signOutRequest>) {
//   yield call(
//     api.post,
//     "Self/Logout",{
//       headers: {
//         "User-Key": userKey,
//       },
//     }
//   );

// }


export function* createProfile({
  payload,
}: ActionType<typeof requestCreateProfile>) {
  let avatar = '';

  if (payload.photoUrl === (undefined || '')) {
    avatar = `https://ui-avatars.com/api/?background=6B8BC8&color=fff&&name=${payload.name}`;
  } else {
    avatar = payload.photoUrl;
  }

  let uid: string | null = '';


  // try {
  //   const responseEmail = yield call(
  //     axios.get,
  //     `${baseUrl.BELLA}/profile/register/verify-non-existent-email?email=${payload.email}`
  //   );
  //   if (responseEmail.status === 200)
  //     try {
  //       const responseDoc = yield call(
  //         axios.get,
  //         `${baseUrl.BELLA}/profile/register/verify-non-existent-doc?doc=${payload.doc}`
  //       );
  //       if (responseDoc.status === 200)
  //         try {
  //           const responseSignUp = yield call(
  //             api.post,
  //             `${baseUrl.AUTH}/signup`,
  //             {
  //               email: payload.email,
  //               password: payload.password,
  //               username: payload.email,
  //               domainId: 1,
  //               tenantId: 1,
  //             }
  //           );
  //           if (responseSignUp.status === 200) {
  //             try {
  //               const data = qs({
  //                 grant_type: 'password',
  //                 // username: 'user1@teste.com',
  //                 username: payload.email,
  //                 password: payload.password,
  //               });

  //               const responseToken = yield call(
  //                 axios.post,
  //                 `${baseUrl.AUTH}/oauth/token`,
  //                 data,
  //                 {
  //                   headers: {
  //                     'Accept': '*/*',
  //                     'Content-Type': 'application/x-www-form-urlencoded',
  //                     'Authorization': 'Basic bW9iaWxlOmJlbGxhQDIwMTk=',
  //                   },
  //                 }
  //               );

  //               const {
  //                 access_token: token,
  //                 refresh_token: refreshToken,
  //                 userId,
  //               } = responseToken.data;

  //               axios.defaults.headers.Authorization = `Bearer ${token}`;

  //               yield put(setUserId(token, userId));

  //               const uidReducer = (state: StoreState) => state.auth.uid;
  //               const uId = yield select(uidReducer);

  //               if (responseToken.status === 200) {
  //                 yield put(setFCMToken(payload.fcmToken, userId, token));

  //                 try {
  //                   axios.defaults.headers.Authorization = `Bearer ${token}`;
  //                   const responseProfile = yield call(
  //                     axios.post,
  //                     `${baseUrl.BELLA}/profile`,
  //                     {
  //                       userId,
  //                       uId,
  //                       name: payload.name,
  //                       doc: payload.doc,
  //                       email: payload.email,
  //                       birthDate: payload.birthdateValid,
  //                       phoneNumber: payload.phoneNumber,
  //                       // healthCard: payload.healthCardNumber,
  //                       photoUrl: avatar,
  //                       domainId: 1,
  //                       tenantId: 1,
  //                       // activationCodeId,
  //                       address: [
  //                         {
  //                           address: payload.address,
  //                           number: payload.number,
  //                           complement: payload.complement,
  //                           neighborhood: payload.neighborhood,
  //                           state: payload.state,
  //                           city: payload.city,
  //                           zipCode: payload.cep,
  //                         },
  //                       ],
  //                     }
  //                   );

  //                   if (responseProfile.status === 201) {
  //                     const profile = responseProfile.data;

  //                     yield put(saveProfile(profile));
  //                     yield put(signInSuccess(token, refreshToken));
  //                   }
  //                   yield put(availableButtons(true));
  //                   yield put(setSigned());
  //                   yield put(cancelLoading());
  //                 } catch (error) {
  //                   yield put(availableButtons(true));
  //                   yield put(cancelLoading());
  //                   if (error.response) {
  //                     switch (error.response.status) {
  //                       case 500:
  //                         break;
  //                       case 404:
  //                         break;
  //                       case 400:
  //                         break;
  //                       default:
  //                         break;
  //                     }
  //                   }
  //                 }
  //               }
  //             } catch (error) {
  //               yield put(availableButtons(true));
  //               yield put(cancelLoading());
  //               if (error.response) {
  //                 switch (error.response.status) {
  //                   case 500:
  //                     break;
  //                   case 404:
  //                     break;
  //                   case 400:
  //                     break;
  //                   default:
  //                     break;
  //                 }
  //               }
  //             }
  //           }
  //         } catch (error) {
  //           yield put(availableButtons(true));
  //           yield put(cancelLoading());
  //           if (error.response) {
  //             switch (error.response.status) {
  //               case 500:
  //                 break;
  //               case 404:
  //                 break;
  //               case 400:
  //                 break;
  //               case 409:
  //                 yield put(cancelLoading());
  //                 NavigationService.navigate({ routeName: 'SignUp' });
  //                 break;
  //               default:
  //                 break;
  //             }
  //           }
  //         }
  //     } catch (error) {
  //       yield put(availableButtons(true));
  //       yield put(cancelLoading());
  //       if (error.response) {
  //         switch (error.response.status) {
  //           case 500:
  //             break;
  //           case 404:
  //             yield put(failureAutenticationCode('404'));
  //             break;
  //           case 400:
  //             yield put(failureAutenticationCode('400'));
  //             break;
  //           case 409:
  //             yield put(cancelLoading());
  //             yield put(docError());
  //             NavigationService.navigate({ routeName: 'SignUp' });
  //             break;
  //           case 401:
  //             yield put(failureAutenticationCode('401'));
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     }
  // } catch (error) {
  //   yield put(availableButtons(true));
  //   yield put(cancelLoading());
  //   if (error.response) {
  //     switch (error.response.status) {
  //       case 500:
  //         break;
  //       case 404:
  //         yield put(cancelLoading());
  //         yield put(emailError());
  //         break;
  //       case 400:
  //         yield put(failureAutenticationCode('400'));
  //         break;
  //       case 409:
  //         yield put(cancelLoading());
  //         yield put(emailError());
  //         NavigationService.navigate({ routeName: 'SignUp' });
  //         break;
  //       case 401:
  //         yield put(failureAutenticationCode('401'));
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }


}





export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  // takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/REQUEST_CREATE_PROFILE', createProfile),
]);
