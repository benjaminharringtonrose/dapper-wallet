import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, FONTS } from "../constants";
import Tabs from "./tabs";

export const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"MainLayout"}
    >
      <Stack.Screen name="MainLayout" component={Tabs} />
    </Stack.Navigator>
  );
};
