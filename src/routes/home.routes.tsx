import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateContacts from "../pages/CreateContacts";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="CreateContacts" component={CreateContacts} />
    </Tab.Navigator>
  );
}

// const Stack = createStackNavigator();

// export default function HomeStack() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//   );
// }
