import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
import React, { FC } from "react";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import Polygon1 from "../../../assets/images/PolygonS.svg";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";

type Props = {
  Tchildren: JSX.Element;
  Bchildren: JSX.Element;
  Negative: number | Animated.Value;
  Positive: number | Animated.Value;
  TopImageWidth: string | Animated.AnimatedInterpolation<string | number>;
  TopImageRight: string | Animated.AnimatedInterpolation<string | number>;
  TopImageB: string | Animated.AnimatedInterpolation<string | number>;
  TopImageRotate: string | Animated.AnimatedInterpolation<string | number>;
  BottomImageB?: string | Animated.AnimatedInterpolation<string | number>;
};

const Layout: FC<Props> = ({
  Tchildren,
  Bchildren,
  Negative,
  Positive,
  TopImageWidth,
  TopImageRight,
  TopImageB,
  TopImageRotate,
  BottomImageB = "9%",
}) => {
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        position: "relative",
        elevation: Platform.OS === "android" ? 1 : 0,
        backgroundColor: theme.backMode1,
      }}
    >
      <Animated.View
        style={{
          ...styles.topImage,
          width: TopImageWidth,
          right: TopImageRight,
          bottom: TopImageB,
          transform: [{ rotate: TopImageRotate }],
        }}
      >
        <Polygon1 fill={theme.polygen} width={"100%"} />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.bottomImage,
          width: TopImageWidth,
          bottom: BottomImageB,
        }}
      >
        <Polygon1 fill={theme.polygen} width={"100%"} />
      </Animated.View>

      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View
          style={{
            ...styles.holder,
            justifyContent: "center",
            alignItems: "center",
            flex: Negative,
          }}
        >
          {Tchildren}
        </Animated.View>
        <Animated.View
          style={{
            ...styles.holder,
            ...styles.bottom,
            flex: Positive,
            backgroundColor: theme.darkBackground,
          }}
        >
          {Bchildren}
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default observer(Layout);

const styles = StyleSheet.create({
  holder: {
    paddingHorizontal: "8%",
  },
  bottom: {
    paddingBottom: "7%",
    paddingTop: 35,
    borderTopStartRadius: 35,
    borderTopRightRadius: 35,
    zIndex: 10,
  },
  topImage: {
    position: "absolute",
    transform: [{ rotate: "30deg" }],
    zIndex: -1,
    resizeMode: "contain",
  },
  bottomImage: {
    position: "absolute",
    left: "53%",
    zIndex: -1,
    transform: [{ rotate: "31deg" }],
    resizeMode: "contain",
  },
});
