import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, FONTS } from "../constants";
import Tabs from "./tabs";

export const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        title: "DapperWallet",
        headerTitleStyle: [FONTS.h2, { color: COLORS.white }],
        headerStyle: {
          backgroundColor: COLORS.black,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
      }}
      initialRouteName={"MainLayout"}
    >
      <Stack.Screen name="MainLayout" component={Tabs} />
    </Stack.Navigator>
  );
};
