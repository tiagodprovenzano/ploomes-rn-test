import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Home from "../pages/Home";
import CreateContacts from "../pages/CreateContacts";

const Stack = createStackNavigator();

export default function ContactStack({ route }: any) {
  const navigation = useNavigation();

  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateContacts" component={CreateContacts} />
    </Stack.Navigator>
  );
}
