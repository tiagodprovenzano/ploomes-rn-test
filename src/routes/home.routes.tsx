import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../pages/Profile";
import ContactStack from "./contact.routes";

import TabItem from "../components/TabItem";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ContactStack"
        component={ContactStack}
        options={{
          tabBarButton: (props) => (
            <TabItem label="Lista" iconName="clipboard-list" {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <TabItem label="Meu Perfil" iconName="account" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
