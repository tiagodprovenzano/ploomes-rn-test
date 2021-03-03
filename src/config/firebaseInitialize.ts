import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC-bmNLSsyVw-jJG5SWYn_41nyA76tm6HE",
  authDomain: "ploomes-5b86c.firebaseapp.com",
  databaseURL: 'https://ploomes-5b86c.firebaseapp.com',
  projectId: "ploomes-5b86c",
  storageBucket: "ploomes-5b86c.appspot.com",
  messagingSenderId: "378203779727",
  appId: "1:378203779727:web:cd0054f4c0881374f676fa"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebaseConfig;
