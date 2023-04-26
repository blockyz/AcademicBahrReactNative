import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "../Navigator/DrawerNavigator";
import { observer } from "mobx-react";
import rootStore from "../../store/Store";
import LockFirstPage from "../../component/content/panel/LockApp/LockFirstPage";

type Props = {};
const Stack1 = createNativeStackNavigator();

const AuthenticatedApp = (props: Props) => {
  const GetSettingStore = rootStore.getSettingData();
  return (
    <NavigationContainer>
      <Stack1.Navigator
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      >
        {GetSettingStore.Lock.lock && !GetSettingStore.Lock.shouldNavigate ? (
          <Stack1.Screen
            name="LockFirstPage"
            options={{
              statusBarTranslucent: true,
              statusBarStyle: "light",
              statusBarColor: "transparent",
            }}
            component={LockFirstPage}
          />
        ) : (
          <Stack1.Screen
            name="Courses"
            options={{
              statusBarTranslucent: true,
              statusBarStyle: "light",
              statusBarColor: "transparent",
            }}
            component={DrawerNavigator}
          />
        )}
      </Stack1.Navigator>
    </NavigationContainer>
  );
};

export default observer(AuthenticatedApp);

const styles = StyleSheet.create({});
