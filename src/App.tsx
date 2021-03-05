import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar, LogBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "react-native-splash-screen";

import "./config/ReactotronConfig";

import { store, persistor } from "./store";

import theme from "./styles/themes/theme";

import Routes from "./routes";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
