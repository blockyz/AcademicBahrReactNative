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

const LockApp = () => {
  const SettingStore = rootStore.setting;
  const [password, setPassword] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [ConfirmPassword, setConfirmPassword] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [Step, SetStep] = useState<1 | 2>(1);

  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);

  const nav = useNavigation();
  const handleUnlock = (): void => {
    const pass = password.filter(Boolean).join("");
    SettingStore.SetPassword(pass);
    SettingStore.SetLock(true);
    Toast.show({ text1: "با موفقیت انجام شد", type: "success" });
    nav.navigate("Setting");
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
    if (
      password.length === 4 &&
      Step === 1 &&
      !JSON.stringify(password).includes("null")
    ) {
      setConfirmPassword(password);
      setPassword([null, null, null, null]);
      handleFocusNext(inputRefs[0]);
      SetStep(2);
    }
  }, [password, Step]);

  useEffect(() => {
    const backAction = () => {
      if (Step === 1) {
        backHandler.remove();
      } else {
        setConfirmPassword([null, null, null, null]);
        setPassword([null, null, null, null]);
        handleFocusNext(inputRefs[0]);
        SetStep(1);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    // return () => backHandler.remove();
  }, [Step]);

  return (
    <Layout
      title={Step === 1 ? "پسورد را وارد کنید" : "پسورد را دوباره وارد کنید"}
      Buttun={
        <>
          {JSON.stringify(ConfirmPassword) === JSON.stringify(password) &&
            !JSON.stringify(password).includes("null") && (
              <TouchableOpacity
                onPress={handleUnlock}
                style={styles.unlockButton}
              >
                <CustomText style={styles.unlockButtonText}>
                  فعال سازی
                </CustomText>
              </TouchableOpacity>
            )}
        </>
      }
    >
      <>
        {inputRefs.map((ref, index) => (
          <TextInput
            key={index}
            style={{
              ...styles.inputField,
              borderColor:
                ConfirmPassword.length === 4 &&
                JSON.stringify(ConfirmPassword) === JSON.stringify(password)
                  ? "green"
                  : "red",
              borderWidth: Step === 1 ? 0 : 1,
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

export default observer(LockApp);
