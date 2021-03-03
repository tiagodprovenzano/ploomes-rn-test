import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AuthStack from "./auth.routes";
import HomeStack from "./home.routes";

import { StoreState } from "../store";

export default function Routes() {
  const signedReducer = useSelector((state: StoreState) => state.auth.signed);

  const [signed, setSigned] = useState(false);

  useEffect(() => {
    if (signedReducer) {
      setSigned(true);
    }
  }, [signedReducer]);

  return (
    <NavigationContainer>
      {signed ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
