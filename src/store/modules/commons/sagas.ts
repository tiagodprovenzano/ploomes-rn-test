// /* eslint-disable import/no-named-as-default-member */
// /* eslint-disable no-alert */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable guard-for-in */

// import {takeLatest, call, all, select, fork, put} from 'redux-saga/effects';
// import DeviceInfo from 'react-native-device-info';

// import {Platform, Alert, Linking} from 'react-native';
// import axios from 'axios';
// import RNFetchBlob from 'rn-fetch-blob';
// import baseUrl from '../../../services/baseUrl';
// import DateHelper from '../../../helpers/dateValidate';

// import {checkVersionSuccess} from './actions';

// // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// // window.Blob = RNFetchBlob.polyfill.Blob;

// export function* request(obj) {
//   console.tron.log('passou');
//   axios.defaults.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXV0aG9yaXphdGlvbiIsInJlcXVlc3QiLCJiZWxsYSIsImNvbW11bmljYXRpb24iXSwidXNlcl9uYW1lIjoiMTExQHRlc3RlLmNvbSIsInNjb3BlIjpbIlJFQUQiLCJXUklURSJdLCJyZWdpc3RlclN0YXR1cyI6IklOQ09NUExFVEUiLCJleHAiOjE1ODgyNTQ2NDIsInVzZXJJZCI6MjEyLCJhdXRob3JpdGllcyI6WyJST0xFX2FkbWluIiwiY3JlYXRlX2RhdGEiLCJyZWFkX2RhdGEiLCJ1cGRhdGVfZGF0YSIsImRlbGV0ZV9kYXRhIl0sImp0aSI6ImE1NzNjMGVjLTFkYzMtNGIyMi04M2IyLTAzZjFiZTE1YTYwOSIsImNsaWVudF9pZCI6Im1vYmlsZSIsInN0YXR1cyI6IkFDVElWRSJ9.YYy_CrEtwU`;

//   const response = yield fork(
//     axios.post,
//     `${baseUrl.BELLA}/interaction/message`,
//     obj,
//   );
//   console.tron.log(response);
// }

// export function* createMessages({payload}) {
//   const {chats} = payload;
//   const promises = chats.map((chat) => {
//     const {messages, members} = chat.val();
//     if (messages !== undefined && members !== undefined) {
//       const msgs = [];
//       Object.values(messages).forEach((msg) => {
//         const createdAt = DateHelper.formatDateWithWrongFormatToPersist(
//           msg.date,
//           msg.time,
//         );
//         const obj = {
//           createdAt,
//           type: msg.messageType,
//         };
//         msgs.push(obj);
//       });
//       let uid1 = '';
//       let uid2 = '';
//       const uIds = Object.keys(members);
//       Object.values(uIds).map((uId, index) => {
//         if (index === 0) {
//           uid1 = uId;
//         } else {
//           uid2 = uId;
//         }
//       });
//       axios.defaults.headers.Authorization =
//         'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXV0aG9yaXphdGlvbiIsInJlcXVlc3QiLCJiZWxsYSIsImNvbW11bmljYXRpb24iXSwidXNlcl9uYW1lIjoiMTExQHRlc3RlLmNvbSIsInNjb3BlIjpbIlJFQUQiLCJXUklURSJdLCJyZWdpc3RlclN0YXR1cyI6IklOQ09NUExFVEUiLCJleHAiOjE1ODgyNjcxOTcsInVzZXJJZCI6MjEyLCJhdXRob3JpdGllcyI6WyJST0xFX2FkbWluIiwiY3JlYXRlX2RhdGEiLCJyZWFkX2RhdGEiLCJ1cGRhdGVfZGF0YSIsImRlbGV0ZV9kYXRhIl0sImp0aSI6IjZlZGRlY2Q5LTE0ZjUtNDkzMS05ZGIzLWFiNzgxNjI2MWQ3YyIsImNsaWVudF9pZCI6Im1vYmlsZSIsInN0YXR1cyI6IkFDVElWRSJ9.ax3z15jxtaZPNzH38E9i4XKdKis8Ar2YjOmxdQOyUwRe_BkZ5cqRCZ-VCoFjpWVkpCc6cFqvxyLv4_rnba7tJ-MAO1HMEggjGGPQnQtPZBm-J8IOVVBzU9Tv4_vAyu6rRbWXk0KSz2kg-QXuR34Jj_mJloRKAbbW5BJeKcUya50jjuhmTuH4Co7bRrISSpY_ApJwW3Gqo6FAObKCpHJrAvFTcixjf9d4045htedEHHcvmntmBlvJxdzvqAsfR3l_AYdz1n2I7AJgt_f0Iq7aAxtsTPzhSe6xDNNivDUdU1fmBFH74Xutcyav36uwKkjASUhZ6S1igB7knIW4sxiUMw';

//       const response = call(
//         axios.post,
//         `${baseUrl.BELLA}/interaction/message`,
//         {
//           uid1,
//           uid2,
//           messages: msgs,
//         },
//       );

//       return response;
//     }
//   });
//   const result = yield all(promises);
//   console.tron.log(result);
// }

// export function* checkVersion({payload}) {
//   try {
//     const tokenn = (state) => state.auth.token;
//     const token = yield select(tokenn);

//     const versionAndroid = (state) => state.commons.versionAndroid;
//     const versionAndroidOld = yield select(versionAndroid);

//     // axios.defaults.headers.Authorization = `Bearer ${token}`;

//     const response = yield call(axios.get, `${baseUrl.BELLA}/params`);

//     console.tron.log(response);

//     const version = DeviceInfo.getBuildNumber();

//     const data = response.data.map((res) => {
//       if (res.platform.toLowerCase() === Platform.OS) {
//         if (Platform.OS === 'android') {
//           if (version < res.versionValue && res.target === 'APP') {
//             // if (version < 22 && res.target === 'APP') {
//             Alert.alert(
//               'Atualização disponível',
//               'É preciso baixar uma nova versão do app',
//               [
//                 {
//                   text: 'OK',
//                   onPress: () =>
//                     Linking.openURL(
//                       'https://play.google.com/store/apps/details?id=com.bellamaterna_app',
//                     ),
//                 },
//               ],
//               {cancelable: false},
//             );
//           }
//         }
//       }
//     });

//     yield put(checkVersionSuccess(response.data));

//     if (response) {
//     }
//   } catch (error) {
//     console.tron.log(error);
//     if (error.response) {
//       switch (error.response.status) {
//         case 500:
//           break;
//         case 404:
//           break;
//         case 400:
//           break;
//         default:
//           break;
//       }
//     }
//   }
// }

// export default all([
//   takeLatest('@commons/CHECK_VERSION', checkVersion),
//   takeLatest('@commons/REQUEST_CREATE_MESSAGES', createMessages),
// ]);
