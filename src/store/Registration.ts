import AsyncStorage from "@react-native-async-storage/async-storage";
import { types } from "mobx-state-tree";

const UserInterface = types.model({
  _id: types.string,
  fullName: types.string,
  email: types.string,
  phoneNumber: types.string,
  birthDate: types.string,
  role: types.string,
  isActive: types.boolean,
  nationalId: types.string,
  registerDate: types.string,
  profile: types.string,
});
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

export const Registration = types
  .model({
    Active: types.boolean,
    user: UserInterface,
    token: types.string,
    resetPasswordToken: types.string,
  })
  .actions((self) => ({
    SetActive(data: UserItem, token: string) {
      self.user = data;
      self.token = token;
      self.Active = true;
    },
    SetUpdateUser(data: UserItem) {
      self.user = data;
    },
    SetDeActive() {
      self.Active = false;
      self.token = "";
      self.user = {
        _id: "",
        birthDate: "",
        email: "",
        fullName: "",
        isActive: false,
        nationalId: "",
        phoneNumber: "",
        profile: "",
        registerDate: "",
        role: "",
      };
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("password");
      AsyncStorage.removeItem("ResetPasswordToken");
      AsyncStorage.removeItem("theme");
    },
    SetResetPasswordToken(data: string) {
      self.resetPasswordToken = data;
      AsyncStorage.setItem("ResetPasswordToken", self.resetPasswordToken);
    },
  }));
