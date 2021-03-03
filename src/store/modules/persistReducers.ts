import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Reducer } from 'redux';

export default (reducers: Reducer) => {
  const persistedReducer = persistReducer(
    {
      storage: AsyncStorage,
      key: 'ploomes',
      whitelist: ['auth', 'commons', 'contacts'],
    },
    reducers
  );
  return persistedReducer;
};
