import React from "react";
import { View, Text } from "react-native";

import { COLORS, FONTS, SIZES } from "../constants";

const HeaderBar = ({ title }: { title: string }) => {
  return (
    <View
      style={{
        justifyContent: "flex-end",
      }}
    >
      <Text style={[FONTS.h1, { color: COLORS.white }]}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
