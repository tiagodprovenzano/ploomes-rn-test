import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateContacts from "../pages/CreateContacts";

import TabItem from "../components/TabItem";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => (
            <TabItem label="Lista" iconName="clipboard-list" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Contato"
        component={CreateContacts}
        options={{
          tabBarButton: (props) => (
            <TabItem
              label="Contato"
              iconName="card-account-details"
              {...props}
            />
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
