import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacityProps,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import { FONTS, SIZES, COLORS } from "../constants";

export interface ButtonProps extends TouchableOpacityProps {
  type?: "contained" | "bordered" | "text";
  label: string;
  loading?: boolean;
  disabled?: boolean;
  prefixIcon?: string;
  postfixIcon?: string;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = (props: ButtonProps) => {
  const { type = "contained", textColor } = props;
  const contentColor = textColor ? textColor : type === "contained" ? "white" : COLORS.primary;
  return (
    <TouchableOpacity
      {...props}
      disabled={props.loading || props.disabled}
      style={[
        {
          backgroundColor: type === "contained" ? COLORS.lightGray : undefined,
          paddingHorizontal: type !== "text" ? 10 : 0,
          paddingVertical: 5,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 45,
          borderRadius: 10,
          opacity: props.disabled || props.loading ? 0.5 : 1.0,
          borderColor: COLORS.primary,
          borderWidth: type === "bordered" ? 1 : 0,
        },
        props.style,
      ]}
    >
      {props.loading ? (
        <ActivityIndicator color={type === "contained" ? COLORS.lightGray2 : COLORS.gray1} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* {!!props.prefixIcon && (
            <Icon
              name={props.prefixIcon}
              size={20}
              color={contentColor}
              style={{ marginRight: 10 }}
            />
          )} */}
          <Text
            style={[
              {
                color: contentColor,
                fontWeight: "600",
              },
              props.textStyle,
            ]}
          >
            {props.label}
          </Text>
          {/* {!!props.postfixIcon && (
            <Icon
              name={props.postfixIcon}
              size={20}
              color={contentColor}
              style={{ marginLeft: spacings.small }}
            />
          )} */}
        </View>
      )}
    </TouchableOpacity>
  );
};
