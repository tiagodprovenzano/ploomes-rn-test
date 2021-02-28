import { combineReducers } from 'redux';
import type { StoreState } from '../index';

import auth from './auth/reducer';
import commons from './commons/reducer';

export default combineReducers<StoreState>({
  auth,
  commons,
});
