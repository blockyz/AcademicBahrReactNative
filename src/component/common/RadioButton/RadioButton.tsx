import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { FC, useState, useEffect } from "react";
import CustomText from "../Text/CustomText";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";

type Props = {
  array: Array<obj>;
  check?: string;
  SetCheck?: (data: string) => void | undefined;
};
interface obj {
  value: string;
  label: string;
}
const RadioButton: FC<Props> = ({ array, check = "", SetCheck = () => {} }) => {
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  return (
    <View
      style={{ flexDirection: "row-reverse", justifyContent: "space-between" }}
    >
      {array.map((i, x) => (
        <TouchableOpacity
          key={x}
          onPress={() => {
            SetCheck(i.value);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomText style={{ color: theme.textColorDescription }}>
              {i.label}
            </CustomText>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                borderColor: "#4F91FF",
                borderWidth: 2.5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                  backgroundColor: "#4F91FF",
                  display: i.value === check ? "flex" : "none",
                }}
              ></View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
