import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import theme from "../styles/themes/theme";

import AuthStack from "./auth.routes";
import HomeStack from "./home.routes";

import { StoreState } from "../store";

export default function Routes() {
  const signed = useSelector((state: StoreState) => state.auth.signed);
  const loading = useSelector((state: StoreState) => state.auth.loading);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {signed ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
