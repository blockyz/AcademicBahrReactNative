import { StyleSheet, Text, View, Animated, Alert } from "react-native";
import React, { FC, useEffect, useRef } from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import {
  ParamListBase,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Anim } from "../Animation/Animation";
import CoursesNavbar from "./CoursesNavbarItem";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";

type Props = {
  route: RouteProp<ParamListBase, string>;
  click: boolean;
  PaddingDecrese: Animated.Value;
  HeightDecrese: Animated.Value;
  HeightGrow: Animated.Value;
  PaddingGrow: Animated.Value;
  courseNavHeight: number;
  navheight: number;
};

const Navbar: FC<Props> = ({
  route,
  click,
  PaddingDecrese,
  HeightDecrese,
  HeightGrow,
  PaddingGrow,
  courseNavHeight,
  navheight,
}) => {
  useEffect(() => {
    if (route.name === "Course") {
      if (click) {
        Anim(HeightGrow, courseNavHeight, 500);
        Anim(PaddingGrow, navheight, 500);
      } else {
        Anim(HeightGrow, navheight, 0);
        Anim(PaddingGrow, 0, 0);
      }
    }
  }, [click]);
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <Animated.View
      style={{
        ...styles.nav,
        height: route.name === "Course" ? HeightGrow : HeightDecrese,
        paddingTop: route.name === "Course" ? PaddingGrow : PaddingDecrese,
        backgroundColor: theme.lightBackground,
      }}
    >
      <CoursesNavbar />
    </Animated.View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
