import { StyleSheet } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../../component/content/Registeration/Welcome";
import Login from "../../component/content/Registeration/Login";
import SignUp from "../../component/content/Registeration/SignUp";
import ForgetPass from "../../component/content/Registeration/ForgetPass";
import { observer } from "mobx-react";
import DrawerNavigator from "../Navigator/DrawerNavigator";

const Stack = createNativeStackNavigator();

const UnAuthenticatedApp: FC<any> = observer(({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ animation: "slide_from_left" }}
        />
        <Stack.Screen
          name="ForgetPass"
          component={ForgetPass}
          options={{ animation: "none" }}
          listeners={{
            focus: () => {},
          }}
        />
        <Stack.Screen
          name="Courses"
          options={{
            statusBarTranslucent: true,
            statusBarStyle: "light",
            statusBarColor: "transparent",
          }}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default UnAuthenticatedApp;

const styles = StyleSheet.create({});
