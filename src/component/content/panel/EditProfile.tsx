import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import CustomText from "../../common/Text/CustomText";
import { observer } from "mobx-react";
import rootStore from "../../../store/Store";
import Btn from "../../common/Button/Btn";
import Field from "../../common/Field/Field";
import Galery from "../../../assets/images/svg/Galery.svg";
import User from "../../../assets/images/svg/9024845_user_circle_light_icon.svg";
import UserId from "../../../assets/images/svg/9026133_user_list_icon.svg";
import Phone from "../../../assets/images/svg/9025852_phone_call_icon.svg";
import Birth from "../../../assets/images/svg/9055163_bxs_calendar_plus_icon.svg";
import BirthAsly from "../../../assets/images/svg/Birth.svg";
import { SvgProps } from "react-native-svg";
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import ModalWrapper from "../../common/modal/ModalWrapper";
import Cam from "../../../assets/images/svg/Camera.svg";
import Gal from "../../../assets/images/svg/Galery.svg";
import DatepickerWrapper from "../../common/modal/DatepickerWrapper";
import { Formik } from "formik";
import { EditSchema } from "../../../core/validation/EditSchema";
import LaziImageLoader from "../../common/imageloader/LaziImageLoader";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { UploadImage } from "../../../core/services/api/UploadImage-api";
import { UpdateInformation } from "../../../core/services/api/UpdateInformation-api";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";

type Props = {};

type FieldType = {
  icon: React.FC<SvgProps>;
  placeholder: string;
  value: string;
  iconBack?: React.FC<SvgProps>;
  onPressIn?: () => void;
};

type values = {
  name: string;
  Phone: string;
  date: string;
  iduser: string;
};

const EditProfile = (props: Props) => {
  const GetUserStore = rootStore.getRegisterationData();
  const [DatepickerVisibiliry, SetDatepickerVisibiliry] =
    useState<boolean>(false);
  const [DatepickerValue, SetDatepickerValue] = useState<string>(
    GetUserStore.user.birthDate
  );
  const [preview, SetPreview] = useState<string>(GetUserStore.user.profile);
  const [vis, SetVis] = useState(false);
  const [previewImageForUpload, SetPreviewImageForUpload] = useState<Asset>();
  const [previewLoading, SetPreviewLoading] = useState<string>("");

  const isfocused = useIsFocused();
  useEffect(() => {
    if (isfocused) {
      SetVis(false);
      SetPreview(GetUserStore.user.profile);
      SetDatepickerValue(GetUserStore.user.birthDate);
      SetDatepickerVisibiliry(false);
      SetPreviewLoading("");
      SetPreviewImageForUpload();
    }
  }, [isfocused]);

  const filds: FieldType[] = [
    {
      value: "name",
      placeholder: "نام کاربری",
      icon: User,
    },
    {
      value: "Phone",
      placeholder: "شماره تماس",
      icon: Phone,
    },
    {
      value: "iduser",
      placeholder: "شماره ملی",
      icon: User,
    },
    {
      value: DatepickerValue,
      placeholder: "تاریخ تولد",
      icon: BirthAsly,
      iconBack: Birth,
      onPressIn: () => SetDatepickerVisibiliry(true),
    },
  ];

  const GetCameraPermision = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "please access Camera to me",
          buttonPositive: "ok",
          buttonNegative: "Cancel",
          buttonNeutral: "Ask me later",
          message: "please access Camera to me",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  };
  const GetGaleryPermision = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Please access Gallery",
          message: "We need access to your gallery to do X",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  };
  const pickImageCameraHandler = async () => {
    const per = await GetCameraPermision();
    if (per) {
      const res = await launchCamera({ mediaType: "photo" });
      if (res.assets && res.assets[0].uri) {
        SetPreview(res.assets[0].uri);
        SetPreviewImageForUpload(res.assets[0]);
      }
      SetVis(false);
    }
  };
  const pickGaleryCameraHandler = async () => {
    const per = await GetGaleryPermision();
    if (per) {
      const res = await launchImageLibrary({ mediaType: "photo" });
      if (res.assets && res.assets[0].uri) {
        SetPreview(res.assets[0].uri);
        SetPreviewImageForUpload(res.assets[0]);
      }
      SetVis(false);
    }
  };
  const formikref = useRef();
  useEffect(() => {
    if (formikref.current) {
      formikref.current?.setFieldValue("date", DatepickerValue);
    }
    SetDatepickerVisibiliry(false);
  }, [DatepickerValue]);

  const handleSubmit = async (val: {
    name: string;
    Phone: string;
    date: string;
    iduser: string;
    email: string;
  }) => {
    const Before = {
      name: GetUserStore.user.fullName,
      Phone: GetUserStore.user.phoneNumber,
      date: GetUserStore.user.birthDate,
      iduser: GetUserStore.user.nationalId,
      email: GetUserStore.user.email,
      image: GetUserStore.user.profile,
    };
    const value = {
      ...val,
      image: preview,
    };
    const NothingChanges =
      JSON.stringify(Before) === JSON.stringify(value) ? true : false;
    if (NothingChanges) {
      Toast.show({ text1: "تغیری ایجاد نکردید", type: "error" });
    } else {
      if (previewImageForUpload) {
        const res = await UploadImage({
          image: previewImageForUpload,
          setLoad: SetPreviewLoading,
        });
        if (res.result) {
          const img = res.result as string;
          const response = await UpdateInformation({
            obj: {
              ...val,
              image: img,
            },
            id: GetUserStore.user._id,
            setApiLoad: SetPreviewLoading,
          });
          SetPreview(GetUserStore.user.profile);
        }
      } else {
        const response = await UpdateInformation({
          obj: {
            ...val,
            image: GetUserStore.user.profile,
          },
          id: GetUserStore.user._id,
          setApiLoad: SetPreviewLoading,
        });
      }
    }
  };

  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <Layout>
      <>
        <DatepickerWrapper
          val={DatepickerValue}
          SetVal={SetDatepickerValue}
          vis={DatepickerVisibiliry}
          SetVis={SetDatepickerVisibiliry}
        />
        <ModalWrapper
          animIn={"slideInUp"}
          animOut={"slideOutDown"}
          style={{
            backgroundColor: "white",
            paddingVertical: 30,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 80,
          }}
          Modalstyle={{
            justifyContent: "flex-end",
            margin: 0,
          }}
          visible={vis}
          setVisible={SetVis}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Btn
                Vstyle={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#ddd",
                  borderRadius: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                Tstyle={{ display: "none" }}
                Press={pickImageCameraHandler}
              >
                <Cam fill={"#fff"} width={35} height={35} />
              </Btn>
              <CustomText style={{ fontSize: 18 }}>Camera</CustomText>
            </View>
            <View style={{ alignItems: "center" }}>
              <Btn
                Vstyle={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#ddd",
                  borderRadius: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                Tstyle={{ display: "none" }}
                Press={pickGaleryCameraHandler}
              >
                <Galery fill={"#fff"} width={30} height={30} />
              </Btn>
              <CustomText style={{ fontSize: 18 }}>Galery</CustomText>
            </View>
          </View>
        </ModalWrapper>
        <View style={{ justifyContent: "space-between", height: "100%" }}>
          {previewLoading && (
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginBottom: 5,
                justifyContent: "center",
              }}
            >
              <CustomText
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#555",
                  marginLeft: 10,
                }}
              >
                {previewLoading}
              </CustomText>
              {previewLoading !== "مشکلی رخ داد دوباره امتحان کنید" && (
                <ActivityIndicator color={"#555"} />
              )}
            </View>
          )}
          <View id="Top" style={{ height: "40%", alignItems: "center" }}>
            <View
              style={{
                elevation: 8,
                backgroundColor: "#fff",
                width: 125,
                height: 125,
                borderRadius: 125,
              }}
            >
              <LaziImageLoader
                key={preview}
                src={preview}
                style={{ width: "100%", height: "100%", borderRadius: 125 }}
                IMAGE_NOT_FOUND={
                  GetUserStore.user.profile === "user.png"
                    ? require("../../../assets/images/user.png")
                    : undefined
                }
              />
              <Btn
                Press={() => {
                  if (
                    !previewLoading &&
                    previewLoading !== "مشکلی رخ داد دوباره امتحان کنید"
                  ) {
                    SetVis(true);
                  }
                }}
                Vstyle={{
                  width: 35,
                  height: 35,
                  borderRadius: 35,
                  backgroundColor: "#4F91FF",
                  position: "absolute",
                  zIndex: 10,
                  right: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                Tstyle={{ display: "none" }}
              >
                <Galery fill={"#fff"} />
              </Btn>
            </View>
            <CustomText style={{ fontSize: 30, color: theme.textcolorActive }}>
              {GetUserStore.user.fullName}
            </CustomText>
          </View>
          <View style={{ height: "60%", justifyContent: "space-between" }}>
            <Formik
              innerRef={formikref}
              initialValues={{
                name: GetUserStore.user.fullName,
                Phone: GetUserStore.user.phoneNumber,
                date: GetUserStore.user.birthDate,
                iduser: GetUserStore.user.nationalId,
                email: GetUserStore.user.email,
              }}
              onSubmit={handleSubmit}
              validationSchema={EditSchema}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <>
                  <View>
                    {filds.map((i, x) => (
                      <View key={x} style={{ marginTop: x === 0 ? 0 : 25 }}>
                        <Field
                          style={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: "#E3E6E8",
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                          placeholder={i.placeholder}
                          value={
                            i.onPressIn
                              ? i.value
                              : values[i.value as keyof values]
                          } // i.value
                          editable={i.value === "iduser" ? false : true}
                          onChangeText={handleChange(i.value)}
                          onPressIn={i.onPressIn}
                          KeboradShow={i.onPressIn ? false : true}
                          errors={errors[i.value as keyof values]}
                          Estyle={{
                            position: "absolute",
                            top: -22,
                            right: 0,
                            color: "#666",
                          }}
                        />
                        <i.icon
                          style={{ position: "absolute", top: 10, right: 15 }}
                          width={30}
                          height={30}
                        />
                        {i.iconBack && (
                          <i.iconBack
                            style={{ position: "absolute", top: 15, left: 15 }}
                            width={25}
                            height={25}
                          />
                        )}
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Btn
                      title="انصراف"
                      Vstyle={{
                        width: 116,
                        height: 38,
                        borderWidth: 1,
                        borderColor: "#FF0000",
                        borderRadius: 27,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      Tstyle={{ color: "#FF0000", fontSize: 15 }}
                    />
                    <Btn
                      title="ثبت تغییرات"
                      Vstyle={{
                        width: 116,
                        height: 38,
                        backgroundColor: "#04A641",
                        borderRadius: 27,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      Press={() => {
                        if (
                          !previewLoading &&
                          previewLoading !== "مشکلی رخ داد دوباره امتحان کنید"
                        ) {
                          handleSubmit();
                        }
                      }}
                      Tstyle={{ color: "#fff", fontSize: 15 }}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </>
    </Layout>
  );
};

export default observer(EditProfile);
