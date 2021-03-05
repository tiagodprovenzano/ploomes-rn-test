

import { combineReducers } from 'redux';
import type { StoreState } from '../index';
import auth from './auth/reducer';
import commons from './commons/reducer';
import contacts from './contacts/reducer';


export default combineReducers<StoreState>({
  auth,
  commons,
  contacts,
});
