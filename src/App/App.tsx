import { StyleSheet, Text, StatusBar } from "react-native";
import React, { FC, useState, useEffect, useCallback } from "react";
import Splash from "../component/content/SplashScreen/Splash";
import { QueryClientProvider, QueryClient } from "react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "../component/common/Toast/ToastLayout";
import Navigator from "./Navigator/Navigator";
import { observer } from "mobx-react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootStore from "../store/Store";

type Props = {};
type UserItem = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  role: string;
  isActive: boolean;
  nationalId: string;
  registerDate: string;
  profile: string;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // cacheTime: 5000,
      // staleTime: 5000 * 60,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
type Dataitems = {
  title: string;
  teacher: {
    fullName: string;
    profile: string;
  };
  cost: number;
  lesson: {
    image: string;
    description: string;
  };
  startDate: string;
  endDate: string;
  students:
    | Array<{
        _id: string;
        fullName: string;
        email: string;
        profile: string;
      }>
    | [];
  capacity: number;
  _id: string;
};
const App: FC<Props> = observer(({}): JSX.Element => {
  const [show, SetShow] = useState<boolean>(true);
  const [Token, SetToken] = useState<boolean>(false);
  const RegisterStore = rootStore.registration;
  const BasketStore = rootStore.basket;
  const SettingStore = rootStore.setting;
  const GetRegisterStore = rootStore.getRegisterationData();

  const initialLog = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");
    const ResetPasswordToken = await AsyncStorage.getItem("ResetPasswordToken");
    if (ResetPasswordToken) {
      RegisterStore.SetResetPasswordToken(ResetPasswordToken);
    }
    const myTheme = await AsyncStorage.getItem("theme");
    if (myTheme) {
      const theme = JSON.parse(myTheme) as { mode: string; pallete: string };
      SettingStore.SetThemeColor(theme, theme.mode === "dark" ? true : false);
    } else {
      SettingStore.SetThemeColor({ mode: "light", pallete: "blue" }, false);
    }
    if (!token || !user) {
      BasketStore.SetAllShop([]);
      BasketStore.SetAllFavorite([]);
      RegisterStore.SetDeActive();
      SetToken(true);
      return;
    }
    const { _id } = JSON.parse(user) as UserItem;
    const itF = await AsyncStorage.getItem(_id);
    const { Fave = [], Basket = [] } = itF ? JSON.parse(itF) : {};
    const password = await AsyncStorage.getItem("password");
    if (password) {
      const ConvertedPassword = JSON.parse(password) as {
        password: string;
        lock: boolean;
      };
      SettingStore.SetPassword(ConvertedPassword.password);
      SettingStore.SetLock(ConvertedPassword.lock);
      ConvertedPassword.lock === false && SettingStore.SetNavigate(true);
    } else {
      SettingStore.SetPassword("");
      SettingStore.SetLock(false);
      SettingStore.SetNavigate(true);
    }
    BasketStore.SetAllShop(Basket);
    BasketStore.SetAllFavorite(Fave);
    RegisterStore.SetActive(JSON.parse(user), token);
    BasketStore.SetUserId(_id);
    SetToken(true);
  };

  useEffect(() => {
    initialLog();
  }, [GetRegisterStore.Active]);
  useEffect(() => {
    setTimeout(() => {
      if (Token) {
        SetShow(false);
      }
    }, 2500);
  }, [Token]);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <Splash Show={show} />
      {!show && (
        <>
          <QueryClientProvider client={queryClient}>
            <Navigator />
          </QueryClientProvider>
          <Toast config={toastConfig} visibilityTime={2000} />
        </>
      )}
    </>
  );
});

export default App;

const styles = StyleSheet.create({});
