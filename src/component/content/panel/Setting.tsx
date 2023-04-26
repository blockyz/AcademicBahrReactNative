import { StyleSheet, View, GestureResponderEvent } from "react-native";
import React, { FC, useState, useEffect, Fragment } from "react";
import CustomText from "../../common/Text/CustomText";
import Field from "../../common/Field/Field";
import Btn from "../../common/Button/Btn";
import Layout from "./Layout";
import DarkMode from "../../../assets/images/svg/Darkmode.svg";
import Theme from "../../../assets/images/svg/Palet.svg";
import Lock from "../../../assets/images/svg/gholf.svg";
import AboutUs from "../../../assets/images/svg/AboutUs.svg";
import ContactUs from "../../../assets/images/svg/ContactUs.svg";
import Eye from "../../../assets/images/svg/Iconionic-ios-eye.svg";
import CloseEye from "../../../assets/images/svg/CloseEye.svg";
import { SvgProps } from "react-native-svg";
import { observer } from "mobx-react";
import OnOff from "../../common/OnOff/OnOff";
import rootStore from "../../../store/Store";
// import ArrowLeft from "../../../assets/images/arrowLeft.svg";
// import Lock from "../../../assets/images/lock.svg";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { ForgetPassShema } from "../../../core/validation/ForgetPass";
import { ForgetPass } from "../../../core/services/api/ForgetPassword-api";
import { GetStudentById } from "../../../core/services/api/GetStudentById-api";
import { ResetPassword } from "../../../core/services/api/ResetPassword-api";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";

type Props = {};

type Option = {
  icon: React.FC<SvgProps>;
  placeholder: string;
  color: string;
  children?: JSX.Element;
  Press?: (event: GestureResponderEvent) => void;
};
const paletField: { color: string }[] = [
  {
    color: "blue",
  },
  {
    color: "red",
  },
  {
    color: "green",
  },
];
const Setting: FC<Props> = ({}) => {
  const SettingStore = rootStore.setting;
  const GetSettingStore = rootStore.getSettingData();

  const nav = useNavigation();

  const options: Option[] = [
    {
      icon: DarkMode,
      placeholder: "حالت شب",
      color: "#474747",
      children: (
        <OnOff
          onPress={() => {
            SettingStore.SetDarkmode(!GetSettingStore.Darkmode);
          }}
          val={GetSettingStore.Darkmode}
        />
      ),
    },
    {
      icon: Theme,
      placeholder: "پالت رنگی",
      color: "#F0A330",
      children: (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {paletField.map((i, x) => (
            <Btn
              key={x}
              Vstyle={{
                width: 25,
                height: 25,
                backgroundColor: i.color === "blue" ? "#4F91FF" : i.color,
                borderRadius: 35,
                borderWidth:
                  GetSettingStore.themeColor.pallete === i.color ? 1 : 0,
                marginHorizontal: x === 1 ? 10 : 0,
              }}
              Tstyle={{ display: "none" }}
              Press={() => SettingStore.SetThemeColorPalete(i.color)}
            ></Btn>
          ))}
        </View>
      ),
    },
    {
      icon: Lock,
      placeholder: GetSettingStore.Lock.password
        ? "تغییر قفل برنامه"
        : "قفل برنامه",
      color: "#2A8CFE",
      children: GetSettingStore.Lock.password ? (
        <OnOff
          onPress={() => {
            SettingStore.SetLock(!GetSettingStore.Lock.lock);
          }}
          val={GetSettingStore.Lock.lock}
        />
      ) : undefined,
      Press: () => {
        nav.navigate("AppLock");
      },
    },
    {
      icon: AboutUs,
      placeholder: "درباره ما",
      color: "#2FCBA5",
    },
    {
      icon: ContactUs,
      placeholder: "ارتباط باما",
      color: "#F6606C",
    },
  ];
  const [showHidePassword, setShowHidePassword] = useState<boolean>(true);
  const [showHidePasswordSecond, setShowHidePasswordSecond] =
    useState<boolean>(true);
  const GetUserStore = rootStore.getRegisterationData();
  const RegisterStore = rootStore.registration;
  const [SubmitLoading, SetSubmitLoading] = useState<boolean>(false);
  const handlesubmit = async (val: {
    password: string;
    confirmPassword: string;
  }) => {
    const res = await ForgetPass({
      email: GetUserStore.user.email,
      setIsLoad: SetSubmitLoading,
    });
    if (res === true) {
      const response = await GetStudentById({
        id: GetUserStore.user._id,
        setIsLoad: SetSubmitLoading,
      });
      if (response) {
        const resetPasswordExpires = response.resetPasswordExpires;
        const resetPasswordToken = response.resetPasswordToken;
        RegisterStore.SetResetPasswordToken(resetPasswordToken);
        ResetPassword({
          password: val.password,
          setIsLoad: SetSubmitLoading,
          Token: resetPasswordToken,
        });
      }
    }
    if (res === 405) {
      ResetPassword({
        password: val.password,
        setIsLoad: SetSubmitLoading,
        Token: GetUserStore.resetPasswordToken,
      });
    }
  };

  const mythem = GetSettingStore.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  return (
    <Layout>
      <>
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            {options.map((i, x) => (
              <Btn
                key={x}
                Vstyle={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  paddingBottom: x === 4 ? 0 : 20,
                  alignItems: "center",
                }}
                Tstyle={{ display: "none" }}
                Press={i.Press}
              >
                <Fragment key={x}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CustomText
                      style={{
                        fontSize: 17,
                        color: theme.textColor,
                        marginRight: 10,
                      }}
                    >
                      {i.placeholder}
                    </CustomText>
                    <View
                      style={{
                        backgroundColor: i.color,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                      }}
                    >
                      <i.icon style={styles.icons} />
                    </View>
                  </View>
                  {i.children}
                </Fragment>
              </Btn>
            ))}
          </View>
          <Formik
            onSubmit={handlesubmit}
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ForgetPassShema}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <View>
                  <CustomText style={{ color: "#1048B7", fontSize: 18 }}>
                    تغییر رمز عبور:
                  </CustomText>
                  <>
                    <CustomText
                      style={{
                        textAlign: "right",
                        marginTop: 5,
                        top: 5,
                        color: "#555",
                        alignItems: "center",
                      }}
                    >
                      {errors.password
                        ? errors.password
                        : errors.confirmPassword}
                    </CustomText>
                    <View>
                      <Field
                        placeholder="رمز عبور"
                        passBool={showHidePassword ? true : false}
                        style={{
                          padding: 10,
                          paddingHorizontal: 50,
                          width: "100%",
                          backgroundColor: "#fff",
                          borderRadius: 60,
                          position: "relative",
                          height: 50,
                          borderWidth: 1,
                          borderColor: "#E3E6E8",
                        }}
                        value={values.password}
                        onChangeText={handleChange("password")}
                      />
                      <Lock
                        style={{ position: "absolute", right: 15, top: 26 }}
                      />
                      {!showHidePassword ? (
                        <CloseEye
                          style={{ position: "absolute", left: 15, top: 30 }}
                          fill="gray"
                          onPress={() => setShowHidePassword(!showHidePassword)}
                        />
                      ) : (
                        <Eye
                          style={{ position: "absolute", left: 15, top: 30 }}
                          fill="gray"
                          onPress={() => setShowHidePassword(!showHidePassword)}
                        />
                      )}
                    </View>
                    <View>
                      <Field
                        placeholder="رمز عبور"
                        passBool={showHidePasswordSecond ? true : false}
                        style={{
                          padding: 10,
                          paddingHorizontal: 50,
                          width: "100%",
                          backgroundColor: "#fff",
                          borderRadius: 60,
                          position: "relative",
                          height: 50,
                          borderWidth: 1,
                          borderColor: "#E3E6E8",
                        }}
                        value={values.confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                      />
                      <Lock
                        style={{ position: "absolute", right: 15, top: 26 }}
                      />
                      {!showHidePasswordSecond ? (
                        <CloseEye
                          style={{ position: "absolute", left: 15, top: 30 }}
                          fill="gray"
                          onPress={() =>
                            setShowHidePasswordSecond(!showHidePasswordSecond)
                          }
                        />
                      ) : (
                        <Eye
                          style={{ position: "absolute", left: 15, top: 30 }}
                          fill="gray"
                          onPress={() =>
                            setShowHidePasswordSecond(!showHidePasswordSecond)
                          }
                        />
                      )}
                    </View>
                  </>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Btn
                    Vstyle={{
                      backgroundColor: "#04A641",
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 130,
                      borderRadius: 30,
                    }}
                    Tstyle={{ fontSize: 15, color: "#fff" }}
                    title="تغییر رمز عبور"
                    Press={() => handleSubmit()}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </>
    </Layout>
  );
};

export default observer(Setting);

const styles = StyleSheet.create({
  icons: {
    width: 35,
    height: 35,
  },
});
