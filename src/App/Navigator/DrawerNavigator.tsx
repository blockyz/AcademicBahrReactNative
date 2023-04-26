import { View } from "react-native";
import React, { FC, useCallback, useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CourseDetail from "../../component/content/Landing/Courses/CourseDetail";
import TabNavigator from "./TabNavigator";
import WrapperContent from "../../component/common/DrawerContent/MyDrawer";
import LockApp from "../../component/content/panel/LockApp/LockApp";
import useTheme from "../../config/ThemeConfig/ThemeConfig";
const Drawer = createDrawerNavigator();

const SecDrawerNavigator: FC<any> = ({}) => {
  const theme = useTheme({ mode: "dark", pallete: "blue" });

  return (
    <Drawer.Navigator
      id="sec"
      drawerContent={(props) => {
        return <WrapperContent props={props} />;
      }}
      screenOptions={{
        overlayColor: theme.drawerOverlay,
        drawerPosition: "right",
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          width: "56%",
          borderTopLeftRadius: 35,
          borderBottomLeftRadius: 35,
          overflow: "hidden",
        },
      }}
    >
      <Drawer.Screen name="drawer" component={TabNavigator} />
      <Drawer.Screen name="AppLock" component={LockApp} />
    </Drawer.Navigator>
  );
};
const DraweWrapper: FC<any> = ({}) => {
  const theme = useTheme({ mode: "dark", pallete: "blue" });
  return (
    <Drawer.Navigator
      id="wrap"
      drawerContent={(props) => {
        return <WrapperContent props={props} />;
      }}
      screenOptions={{
        overlayColor: theme.drawerOverlay,
        drawerPosition: "right",
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          width: "56%",
          borderTopLeftRadius: 35,
          borderBottomLeftRadius: 35,
          overflow: "hidden",
        },
      }}
    >
      <Drawer.Screen name="DetdrawerW" component={DrawerNavigator} />
    </Drawer.Navigator>
  );
};
const DrawerNavigator: FC<any> = ({}) => {
  return (
    <Drawer.Navigator
      id="Det"
      drawerContent={(props) => (
        <CourseDetail It={props.state.routes[0].params} />
      )}
      screenOptions={{
        overlayColor: "rgba(0,57,152,.55)",
        drawerPosition: "right",
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          width: "100%",
          borderTopLeftRadius: 35,
          borderBottomLeftRadius: 35,
          overflow: "hidden",
        },
      }}
    >
      <Drawer.Screen name="Detdrawer" component={SecDrawerNavigator} />
    </Drawer.Navigator>
  );
};

export default DraweWrapper;
