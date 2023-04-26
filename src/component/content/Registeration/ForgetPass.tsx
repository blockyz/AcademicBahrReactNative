import {
  Animated,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useEffect, useRef } from "react";
import Layout from "./Layout";
import Top from "./TopText";
import Field from "../../common/Field/Field";
import Btn from "../../common/Button/Btn";
import { Anim } from "../../common/Animation/Animation";
import { useNavigation } from "@react-navigation/native";
import Mail from "../../../assets/images/svg/mail.svg";

type Props = {};

const ForgetPass: FC<Props> = ({}) => {
  const navigation = useNavigation();
  const flexGrow = useRef(new Animated.Value(4)).current;
  const flexNegativeGrow = useRef(new Animated.Value(2)).current;
  const TopImageW = useRef(new Animated.Value(130)).current;
  const TopImageR = useRef(new Animated.Value(17)).current;
  const TopImageB = useRef(new Animated.Value(64)).current;
  const TopImageRo = useRef(new Animated.Value(34)).current;
  const BottomImageB = useRef(new Animated.Value(9)).current;

  const TopImageWidth = TopImageW.interpolate({
    inputRange: [82, 130],
    outputRange: ["82%", "130%"],
  });
  const TopImageRight = TopImageR.interpolate({
    inputRange: [17, 41],
    outputRange: ["17%", "41%"],
  });
  const TopImageBottom = TopImageB.interpolate({
    inputRange: [64, 80],
    outputRange: ["64%", "80%"],
  });
  const TopImageRotate = TopImageRo.interpolate({
    inputRange: [30, 34],
    outputRange: ["30deg", "34deg"],
  });
  const BottomImageBottom = BottomImageB.interpolate({
    inputRange: [9, 30],
    outputRange: ["9%", "30%"],
  });

  useEffect(() => {
    if (navigation.isFocused()) {
      Anim(flexGrow, 6, 800);
      Anim(flexNegativeGrow, 9, 800);
      Anim(TopImageW, 82, 0);
      Anim(TopImageR, 41, 0);
      Anim(TopImageB, 80, 0);
      Anim(TopImageRo, 30, 0);
      Anim(BottomImageB, 30, 800);
    }
  }, [navigation.isFocused]);

  const Bottom: JSX.Element = (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Field
          placeholder="ایمیل"
          style={{ marginTop: 0, marginBottom: 0 }}
          passBool={false}
          type="email"
        />
        <Mail style={{ position: "absolute", right: "5%", top: 20 }} />
      </View>
      <Btn
        title="تایید ایمیل"
        Press={() => console.log("smth")}
        Tstyle={{ fontSize: 18, color: "white" }}
        Vstyle={{
          backgroundColor: "#0043F7",
          width: "100%",
          height: 53,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
          alignSelf: "center",
        }}
      >
        <Btn
          title="ثبت نام"
          Press={() =>
            navigation.navigate("SignUp", {
              Forget: true,
            })
          }
          Tstyle={{
            fontSize: 15,
            color: "white",
            textDecorationLine: "underline",
          }}
          Vstyle={{
            backgroundColor: "transparent",
            width: "100%",
            marginRight: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        />
        <View style={{ height: 16, width: 1, backgroundColor: "white" }}></View>
        <Btn
          title="ورود"
          Press={() => navigation.navigate("LogIn")}
          Tstyle={{
            fontSize: 15,
            color: "white",
            textDecorationLine: "underline",
          }}
          Vstyle={{
            backgroundColor: "transparent",
            width: "100%",
            marginRight: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <Layout
      Tchildren={<Top title="فراموشی رمز عبور" desc={null} />}
      Bchildren={Bottom}
      Negative={flexNegativeGrow}
      Positive={flexGrow}
      TopImageWidth={TopImageWidth}
      TopImageRight={TopImageRight}
      TopImageB={TopImageBottom}
      TopImageRotate={TopImageRotate}
      BottomImageB={BottomImageBottom}
    />
  );
};

export default ForgetPass;

const styles = StyleSheet.create({});
