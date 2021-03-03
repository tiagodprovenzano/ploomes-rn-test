import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import contacts from './contacts/sagas';
// import commons from './commons/sagas';

export default function* rootSaga() {
  return yield all([auth, contacts]);
}
