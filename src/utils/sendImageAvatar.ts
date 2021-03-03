/* eslint-disable no-underscore-dangle */
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

// interface ImageProps {
//   blob: any;
//   progressCallback: () => void;
//   successCallback: () => void;
// }

export const sendImageAvatar = async (
  blob,
  progressCallback,
  successCallback
) => {
  const fbImage = storage().ref().child('avatar').child(`${uuidv4()}`);

  await fbImage.putString(blob, 'base64', { contentType: 'image/jpeg' }).on(
    'state_changed',
    progressCallback,
    (error) => {
      Alert.alert('Erro', `${error}`);
    },
    () => {
      fbImage.getDownloadURL().then((imgUrl) => {
        successCallback(imgUrl);
      });
    }
  );
};
