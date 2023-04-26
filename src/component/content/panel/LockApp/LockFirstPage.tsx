import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import Toast from "react-native-toast-message";
import Lock from "../../../../assets/images/svg/gholf.svg";
import rootStore from "../../../../store/Store";
import Btn from "../../../common/Button/Btn";
import CustomText from "../../../common/Text/CustomText";
import Layout from "./Layout";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

const LockFirstPage = () => {
  const SettingStore = rootStore.setting;
  const GetSettingStore = rootStore.getSettingData();
  const [password, setPassword] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);

  const nav = useNavigation();
  const handleUnlock = (): void => {
    const pass = password.filter(Boolean).join("");
    Toast.show({ text1: "با موفقیت انجام شد", type: "success" });
  };
  const handleFocusNext = (inputRef: React.RefObject<TextInput>): void => {
    inputRef.current?.focus();
  };
  const handleBlur = (index: number): void => {
    if (password[index] === "" && index !== 0) {
      const previousInputRef = inputRefs[index - 1];
      previousInputRef.current?.focus();
    }
  };

  const inputRefs: React.RefObject<TextInput>[] = [
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
  ];

  useEffect(() => {
    const pass = password.filter(Boolean).join("");
    if (pass.length === 4 && pass === GetSettingStore.Lock.password) {
      Toast.show({ text1: "با موفقیت وارد  شدید", type: "success" });
      setTimeout(() => {
        SettingStore.SetNavigate(true);
      }, 500);
    }
  }, [password]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const rnBiometrics = new ReactNativeBiometrics();
  const FingerPrintScanner = async () => {
    try {
      const res = await rnBiometrics.simplePrompt({
        cancelButtonText: "انصراف",
        promptMessage: "اثر انگشت خود را وارد کنید",
      });
      if (res.success) {
        Toast.show({ text1: "با موفقیت وارد  شدید", type: "success" });
        SettingStore.SetNavigate(true);
      } else {
        console.log("Authentication failed");
      }
    } catch (error: any) {
      Toast.show({ text1: "تلاش اشتباه زیاد کد را وارد کنید", type: "error" });
      console.log("Error:", error.message);
    }
  };
  const FingerPrintAccept = async () => {
    const { biometryType } = await rnBiometrics.isSensorAvailable();
    if (biometryType === BiometryTypes.Biometrics) {
      FingerPrintScanner();
    }
  };
  useEffect(() => {
    FingerPrintAccept();
  }, []);

  return (
    <Layout title={"پسورد را وارد کنید"}>
      <>
        {inputRefs.map((ref, index) => (
          <TextInput
            key={index}
            style={{
              ...styles.inputField,
              borderColor:
                password.length === 4 &&
                password.filter(Boolean).join("") ===
                  GetSettingStore.Lock.password
                  ? "green"
                  : "red",
              borderWidth: 1,
              fontFamily: "Yekanbakh",
            }}
            onChangeText={(text) => {
              let newStr = [...password]; // create a copy of the existing array
              newStr[index] = text; // update the value of the second element
              setPassword(newStr);
              if (text.length > 0 && index < 3) {
                handleFocusNext(inputRefs[index + 1]);
              }
              if (text.length === 0 && index > 0) {
                handleFocusNext(inputRefs[index - 1]);
              }
            }}
            ref={ref}
            value={password[index]?.toString()}
            maxLength={1}
            onBlur={() => handleBlur(index)}
            keyboardType={"numeric"}
          />
        ))}
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    textAlign: "center",
    marginRight: 10,
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 4,
  },
  unlockButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
  },
  unlockButtonText: {
    color: "black",
  },
});

export default observer(LockFirstPage);
