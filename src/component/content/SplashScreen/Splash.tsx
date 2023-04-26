import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  BackHandler,
  Animated,
  Easing,
} from "react-native";
import React, { FC, useEffect, useRef } from "react";
import Poly from "../../../assets/images/PolygonS.svg";
import PolyBorder from "../../../assets/images/PolygonBorder.svg";
import { Anim } from "../../common/Animation/Animation";
import CustomText from "../../common/Text/CustomText";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";

type Props = {
  Show: boolean;
};

const Splash: FC<Props> = ({ Show }) => {
  const TopImageRo = useRef(new Animated.Value(-720)).current;
  const BottomImageRo = useRef(new Animated.Value(720)).current;
  const TopImageBorderRo = useRef(new Animated.Value(360)).current;
  const BottomImageBorderRo = useRef(new Animated.Value(-200)).current;
  const Opacity = useRef(new Animated.Value(0)).current;

  const TopImageRotate = TopImageRo.interpolate({
    inputRange: [-720, 70],
    outputRange: ["-720deg", "70deg"],
  });
  const BottomImageRotate = BottomImageRo.interpolate({
    inputRange: [44, 720],
    outputRange: ["720deg", "44deg"],
  });
  //100 58

  const TopImageBorderRotate = TopImageRo.interpolate({
    inputRange: [100, 360],
    outputRange: ["360deg", "100deg"],
  });
  const BottomImageBorderRotate = BottomImageRo.interpolate({
    inputRange: [-200, 58],
    outputRange: ["-200deg", "58deg"],
  });

  useEffect(() => {
    Anim(TopImageRo, 70, 3000, 0, Easing.out(Easing.exp));
    Anim(BottomImageRo, 44, 3000, 0, Easing.out(Easing.exp));
    Anim(TopImageBorderRo, 100, 3000, 0, Easing.out(Easing.exp));
    Anim(BottomImageBorderRo, 58, 3000, 0, Easing.out(Easing.exp));
    Anim(Opacity, 1, 3000, 0, Easing.out(Easing.exp));
  }, []);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  if (!Show) {
    return null;
  }

  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: theme.backMode1,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: Opacity,
        }}
      >
        <Image
          // style={{ transform: [{ rotate: "90deg" }] }}
          source={require("../../../assets/images/logo.png")}
        />
        <CustomText
          style={{
            fontSize: 23,
            color: theme.textcolorlogo,
            marginTop: 11,
            textAlign: "center",
            alignSelf: "center",
          }}
          title={"آکادمی کدنویسی بحر"}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          bottom: "78%",
          left: "42%",
          transform: [{ rotate: TopImageRotate }],
          width: "78%",
        }}
      >
        <Poly
          width={"100%"} // 78
          fill={theme.polygen}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: "64%",
          right: "35%",
          transform: [{ rotate: BottomImageRotate }],
          width: "130%",
          height: "51%",
        }}
      >
        <Poly width={"100%"} height={"100%"} fill={theme.polygen} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: "75%",
          left: "41%",
          transform: [{ rotate: TopImageBorderRotate }],
          width: "78%",
        }}
      >
        <PolyBorder width={"100%"} fill="#EAF5FF" />
      </Animated.View>
      <Animated.View
        style={{
          width: "134%",
          height: "53%",

          position: "absolute",
          top: "58%",
          right: "39%",
          transform: [{ rotate: BottomImageBorderRotate }],
        }}
      >
        <PolyBorder width={"100%"} height={"100%"} fill="#EAF5FF" />
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
