import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";

type Props = {
  children: JSX.Element;
};

const Layout: FC<Props> = ({ children }) => {
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 25,
      }}
    >
      <View
        style={{
          backgroundColor: theme.darkbackground2,
          elevation: 8,
          height: "100%",
          borderRadius: 30,
          paddingVertical: 40,
          paddingHorizontal: 30,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default observer(Layout);

const styles = StyleSheet.create({});
