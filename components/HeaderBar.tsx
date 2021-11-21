import React from "react";
import { View, Text } from "react-native";

import { COLORS, FONTS, SIZES } from "../constants";

const HeaderBar = ({ title }: { title: string }) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: "flex-end",
      }}
    >
      <Text style={[FONTS.largeTitle, { color: COLORS.white }]}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
