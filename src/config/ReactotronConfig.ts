import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
  interface Console {
    tron: any;
  }
}

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.13'})
    .setAsyncStorageHandler(AsyncStorage)
    .use(reactotronRedux())
    .use(sagaPlugin({ except: [''] }))
    .useReactNative({ errors: false })
    .connect();

  tron.clear!();

  console.tron = tron;
}
