import AsyncStorage from "@react-native-async-storage/async-storage";
import { types } from "mobx-state-tree";

export const SettingStore = types
  .model({
    Darkmode: types.boolean,
    Lock: types.model({
      password: types.string,
      lock: types.boolean,
      shouldNavigate: types.boolean,
    }),
    themeColor: types.model({
      mode: types.string,
      pallete: types.string,
    }),
  })
  .actions((self) => ({
    SetDarkmode(data: boolean) {
      self.Darkmode = data;
      data ? (self.themeColor.mode = "dark") : (self.themeColor.mode = "light");
      AsyncStorage.setItem("theme", JSON.stringify(self.themeColor));
    },
    SetLock(data: boolean) {
      self.Lock.lock = data;
      AsyncStorage.setItem(
        "password",
        JSON.stringify({
          lock: self.Lock.lock,
          password: self.Lock.password,
        })
      );
    },
    SetPassword(data: string) {
      self.Lock.password = data;
      JSON.stringify({
        lock: self.Lock.lock,
        password: self.Lock.password,
      });
    },
    SetNavigate(data: boolean) {
      self.Lock.shouldNavigate = data;
    },
    SetThemeColorPalete(data: string) {
      self.themeColor.pallete = data;
      AsyncStorage.setItem("theme", JSON.stringify(self.themeColor));
    },
    SetThemeColor(data: { mode: string; pallete: string }, dark: boolean) {
      self.themeColor = data;
      self.Darkmode = dark;
    },
  }));
