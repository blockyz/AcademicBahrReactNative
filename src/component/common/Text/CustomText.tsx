import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import React, { FC } from "react";

type Props = {
  title?: string;
  style?: StyleProp<TextStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: string;
};

const CustomText: FC<Props> = ({ title, style, onPress, children }) => {
  return (
    <Text onPress={onPress} style={[style, { fontFamily: "Yekanbakh" }]}>
      {title}
      {children}
    </Text>
  );
};

export default CustomText;
