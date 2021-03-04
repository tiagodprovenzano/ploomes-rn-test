import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateContacts from "../pages/CreateContacts";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contatos" component={Dashboard} />
      <Tab.Screen name="Adicionar Contato" component={CreateContacts} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
