import {
  StyleSheet,
  Text,
  View,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import Field from "../../common/Field/Field";
import Btn from "../../common/Button/Btn";
import { Anim } from "../../common/Animation/Animation";
import Top from "./TopText";
import Google from "../../../assets/images/svg/1298745_google_brand_branding_logo_network_icon.svg";
import Twiter from "../../../assets/images/svg/5296514_bird_tweet_twitter_twitter logo_icon.svg";
import FaceBook from "../../../assets/images/svg/1920524_facebook_facebook icon_logo_network_icon.svg";
import Mail from "../../../assets/images/svg/mail.svg";
import Gholf from "../../../assets/images/svg/gholf.svg";
import Eye from "../../../assets/images/svg/Iconionic-ios-eye.svg";
import CloseEye from "../../../assets/images/svg/CloseEye.svg";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { Formik } from "formik";
import LoginSchema from "../../../core/validation/LoginSchema";
import { LogInStudent } from "../../../core/services/api/LogInStudent-api";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";

type Props = {};

const Login: FC<Props> = observer(({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const Log = route.params?.Log;
  const [show, SetShow] = useState<boolean>(true);
  const [animate, SetAnimate] = useState<boolean>(true);
  const [loading, SetLoading] = useState<boolean>(false);

  const flexGrow = useRef(new Animated.Value(2)).current;
  const flexNegativeGrow = useRef(new Animated.Value(3)).current;
  const TopImageW = useRef(new Animated.Value(130)).current;
  const TopImageR = useRef(new Animated.Value(17)).current;
  const TopImageB = useRef(new Animated.Value(64)).current;
  const TopImageRo = useRef(new Animated.Value(34)).current;
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
  const BottomImageB = useRef(new Animated.Value(30)).current;
  const BottomImageBottom = BottomImageB.interpolate({
    inputRange: [9, 30],
    outputRange: ["9%", "30%"],
  });

  useEffect(() => {
    if (isFocused) {
      if (Log) {
        Anim(flexGrow, 4, 0);
        Anim(flexNegativeGrow, 2, 0);
        Anim(TopImageW, 82, 0);
        Anim(TopImageR, 41, 0);
        Anim(TopImageB, 80, 0);
        Anim(TopImageRo, 30, 0);
        navigation.setParams({ Log: false });
      } else {
        Anim(flexGrow, 4, 800);
        Anim(flexNegativeGrow, 2, 800);
        Anim(TopImageW, 82, 800);
        Anim(TopImageR, 41, 800);
        Anim(TopImageB, 80, 800);
        Anim(TopImageRo, 30, 800);
        Anim(BottomImageB, 9, 800);
      }
    } else {
      if (!animate) {
        Anim(flexGrow, 4, 0);
        Anim(flexNegativeGrow, 2, 0);
        Anim(TopImageW, 82, 0);
        Anim(TopImageR, 41, 0);
        Anim(TopImageB, 80, 0);
        Anim(TopImageRo, 30, 0);
        SetAnimate(true);
      } else {
        Anim(flexGrow, 2, 800);
        Anim(flexNegativeGrow, 3, 800);
        Anim(BottomImageB, 30, 800);
      }
    }
  }, [isFocused]);

  const handleSubmit = async (value: { email: string; password: string }) => {
    await LogInStudent({ value, SetLoading });
  };
  // navigation.addListener("beforeRemove", (e) => {
  //   SetRemove(!remove);
  // });

  const Bottom: JSX.Element = (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <View
              style={{
                position: "absolute",
                top: 0,
                alignSelf: "center",
              }}
            >
              {loading && <ActivityIndicator color={"#fff"} />}
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 75,
                  justifyContent: "flex-end",
                }}
              >
                <Field
                  placeholder="ایمیل"
                  value={values.email}
                  style={{ marginTop: 0, marginBottom: 0 }}
                  onChangeText={handleChange("email")}
                  passBool={false}
                  type="email"
                  errors={errors.email}
                />
                <Mail style={{ ...styles.iconField, top: 40 }} />
              </View>
              <View
                style={{
                  width: "100%",
                  height: 75,
                  marginTop: 5,
                  justifyContent: "flex-end",
                }}
              >
                <Field
                  placeholder="رمز عبور"
                  value={values.password}
                  errors={errors.password}
                  onChangeText={handleChange("password")}
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                  passBool={show}
                  type="none"
                />
                <Gholf
                  style={{
                    ...styles.iconField,
                    top: 37,
                  }}
                />
                <TouchableOpacity
                  onPress={() => SetShow(!show)}
                  style={{
                    ...styles.iconField,
                    top: 33,
                    left: "5%",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                  }}
                >
                  {show ? <Eye /> : <CloseEye />}
                </TouchableOpacity>
              </View>
              <Btn
                title="فراموشی رمز عبور ؟"
                Press={() => navigation.navigate("ForgetPass")}
                Tstyle={{ fontSize: 18, color: "white" }}
                Vstyle={{
                  backgroundColor: "transparent",
                  marginTop: 10,
                }}
              />
            </View>
            <Btn
              title="ورود"
              disabled={loading}
              Press={() => {
                handleSubmit();
              }}
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
          </>
        )}
      </Formik>

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, color: "white" }}>
          در حال حاضر اکانت فعال ندارید؟
        </Text>
        <Btn
          title="ثبت نام"
          Press={() => {
            navigation.navigate("SignUp", {
              Sign: true,
            });
            SetAnimate(false);
          }}
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
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "90%",
            height: 2,
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
          }}
        ></View>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            backgroundColor: "#3A84FF",
            width: 100,
            textAlign: "center",
          }}
        >
          ورود از طریق
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "60%",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.Icons}>
            <Google />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.Icons}>
            <Twiter />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.Icons}>
            <FaceBook />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <Layout
      Bchildren={Bottom}
      Tchildren={<Top title="ورود" desc={null} />}
      Negative={flexNegativeGrow}
      Positive={flexGrow}
      TopImageWidth={TopImageWidth}
      TopImageRight={TopImageRight}
      TopImageB={TopImageBottom}
      TopImageRotate={TopImageRotate}
      BottomImageB={BottomImageBottom}
    />
  );
});

export default Login;

const styles = StyleSheet.create({
  Icons: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  iconField: {
    position: "absolute",
    right: "5%",
  },
});
