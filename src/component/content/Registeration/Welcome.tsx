import { Image, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import Layout from "./Layout";
import Btn from "../../common/Button/Btn";
import { useNavigation } from "@react-navigation/native";
import Text from "../../common/Text/CustomText";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";
type Props = {};

const Welcome: FC<Props> = ({}) => {
  const navigation = useNavigation();
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  const Bottom: JSX.Element = (
    <View
      style={{
        justifyContent: "space-between",
        alignContent: "space-between",
        flex: 1,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 30,
            ...styles.white,
            marginBottom: 18,
          }}
          title={"خوش آمدید"}
        />
        <Text
          style={{ fontSize: 14, ...styles.white }}
          title={
            "ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرهاو متون بلکه … روزنامه و مجله در ستون و"
          }
        ></Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Btn
          Tstyle={{ color: "white", fontSize: 16, textAlign: "center" }}
          title={"ثبت نام"}
          Press={() => navigation.navigate("SignUp")}
          Vstyle={styles.btn}
        />
        <Btn
          Tstyle={{ color: "white", fontSize: 16 }}
          title={"ورود"}
          Press={() => navigation.navigate("LogIn")}
          Vstyle={styles.Sbtn}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "white",
          textDecorationStyle: "solid",
          textDecorationColor: "white",
          textDecorationLine: "underline",
        }}
        onPress={() => navigation.navigate("Courses")}
        title={"ورود به صفحه اصلی"}
      />
    </View>
  );
  const Top: JSX.Element = (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        top: 40,
      }}
    >
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ width: 115, height: 115 }}
      />
      <Text
        style={{
          fontSize: 23,
          color: theme.textcolorlogo,
          marginTop: 11,
          alignItems: "center",
          alignSelf: "center",
        }}
        title="آکادمی کدنویسی بحر"
      />
    </View>
  );
  return (
    <Layout
      Bchildren={Bottom}
      Tchildren={Top}
      Negative={3}
      Positive={2}
      TopImageWidth={"130%"}
      TopImageRight={"17%"}
      TopImageB={"64%"}
      TopImageRotate={"34deg"}
    />
  );
};

const styles = StyleSheet.create({
  white: {
    color: "white",
  },
  btn: {
    borderColor: "#FFF",
    borderWidth: 2,
    width: 147,
    height: 49,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  Sbtn: {
    width: 147,
    height: 49,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "#0043F7",
  },
});

export default Welcome;
