import {
  Animated,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { Anim } from "../../common/Animation/Animation";
import Top from "./TopText";
import Field from "../../common/Field/Field";
import Btn from "../../common/Button/Btn";
import Eye from "../../../assets/images/svg/Iconionic-ios-eye.svg";
import CloseEye from "../../../assets/images/svg/CloseEye.svg";
import Birth from "../../../assets/images/svg/9055163_bxs_calendar_plus_icon.svg";
import BirthAsly from "../../../assets/images/svg/Birth.svg";
import Mail from "../../../assets/images/svg/mail.svg";
import Gholf from "../../../assets/images/svg/gholf.svg";
import User from "../../../assets/images/svg/9024845_user_circle_light_icon.svg";
import UserId from "../../../assets/images/svg/9026133_user_list_icon.svg";
import Phone from "../../../assets/images/svg/9025852_phone_call_icon.svg";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import DatepickerWrapper from "../../common/modal/DatepickerWrapper";
import { getFormatedDate } from "react-native-modern-datepicker";
import { Formik } from "formik";
import { SignupSchema } from "../../../core/validation/SignupSchema";
import CustomText from "../../common/Text/CustomText";
import { RegisterUser } from "../../../core/services/api/RegisterUser-api";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";
import FormStepsSignUp from "./FormStepsSignUp";

type Props = {};
type FormValue = {
  email: string;
  username: string;
  password: string;
  iduser: string;
  phone: string;
  dateage: string;
};

type values = {
  email: string;
  username: string;
  password: string;
  iduser: string;
  phone: string;
  dateage: string;
};
interface Field {
  placeholder: string;
  style?: Object;
  passBool: boolean;
  type: "none" | "text" | "email";
  iconBack: React.ReactNode;
  icon?: React.ReactNode;
  value: string;
  onPressIn?: () => void;
  onChangeText?: (text: string) => void;
  err: string;
}
type Fields = Field[][];

const SignUp: FC<Props> = observer(({}) => {
  const [open, SetOpen] = useState<boolean>(false);
  const formikred = useRef();
  const [val, SetVal] = useState<string>("");
  useEffect(() => {
    if (formikred.current) {
      formikred.current?.setFieldValue("dateage", val);
    }
    SetOpen(false);
  }, [val]);
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const Sign = route.params?.Sign;
  const Forget = route.params?.Forget;
  const [show, SetShow] = useState<boolean>(true);

  const flexGrow = useRef(new Animated.Value(2)).current;
  const flexNegativeGrow = useRef(new Animated.Value(3)).current;
  const TopImageR = useRef(new Animated.Value(17)).current;
  const TopImageB = useRef(new Animated.Value(64)).current;
  const TopImageRo = useRef(new Animated.Value(34)).current;
  const TopImageW = useRef(new Animated.Value(130)).current;

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

  useEffect(() => {
    if (isFocused) {
      if (Sign) {
        Anim(flexGrow, 4, 0);
        Anim(flexNegativeGrow, 2, 0);
        Anim(TopImageW, 82, 0);
        Anim(TopImageR, 41, 0);
        Anim(TopImageB, 80, 0);
        Anim(TopImageRo, 30, 0);
        navigation.setParams({ Sign: false });
      } else if (Forget) {
        Anim(flexGrow, 2, 0);
        Anim(flexNegativeGrow, 3, 0);
        Anim(TopImageW, 17, 0);
        Anim(TopImageR, 64, 0);
        Anim(TopImageB, 34, 0);
        Anim(TopImageRo, 130, 0);
        Anim(flexGrow, 4, 800);
        Anim(flexNegativeGrow, 2, 800);
        Anim(TopImageW, 82, 0);
        Anim(TopImageR, 41, 0);
        Anim(TopImageB, 80, 0);
        Anim(TopImageRo, 30, 0);
        navigation.setParams({ Forget: false });
      }
      Anim(flexGrow, 4, 800);
      Anim(flexNegativeGrow, 2, 800);
      Anim(TopImageW, 82, 800);
      Anim(TopImageR, 41, 800);
      Anim(TopImageB, 80, 800);
      Anim(TopImageRo, 30, 800);
    }
  }, [isFocused]);

  // const RegisterStore = rootStore.registration[0];
  const [loading, SetLoading] = useState<boolean>(false);
  const handleSubmit = async (value: FormValue) => {
    await RegisterUser({ obj: value, SetLoading });
  };

  const fields: Fields = [
    [
      {
        placeholder: "تاریخ تولد",
        type: "none",
        passBool: false,
        iconBack: <Birth style={{ ...styles.iconBack, top: 14 }} />,
        icon: (
          <BirthAsly
            style={{
              ...styles.icon,
              top: 16,
              transform: [{ rotateY: "180deg" }],
            }}
          />
        ),
        value: val,
        onPressIn: () => SetOpen(true),
        err: "dateage",
      },
      {
        placeholder: "نام کاربری",
        style: {
          marginTop: 0,
          marginBottom: 0,
        },
        passBool: false,
        type: "text",
        iconBack: <User style={{ ...styles.iconBack, top: 16 }} />,
        value: "username",
        onChangeText: "username",
        err: "username",
      },
    ],
    [
      {
        placeholder: "ایمیل",
        passBool: false,
        type: "email",
        iconBack: <Mail style={{ ...styles.icon, top: 19 }} />,
        value: "email",
        onChangeText: "email",
        err: "email",
      },
      {
        placeholder: "شماره تماس",
        passBool: false,
        type: "email",
        iconBack: <Phone style={{ ...styles.iconBack, top: 17 }} />,
        value: "phone",
        onChangeText: "phone",
        err: "phone",
      },
    ],
    [
      {
        placeholder: "رمز عبور",

        passBool: show,
        type: "none",
        iconBack: (
          <TouchableOpacity
            style={{ ...styles.iconBack }}
            onPress={() => SetShow(!show)}
          >
            {!show ? <CloseEye /> : <Eye />}
          </TouchableOpacity>
        ),
        icon: <Gholf style={{ ...styles.icon, top: 16 }} />,
        value: "password",
        onChangeText: "password",
        err: "password",
      },
      {
        placeholder: "شماره ملی",
        passBool: false,
        type: "none",
        iconBack: <UserId style={{ ...styles.iconBack, top: 15 }} />,
        value: "iduser",
        onChangeText: "iduser",
        err: "iduser",
      },
    ],
  ];

  const Bottom = (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <Formik
        innerRef={formikred}
        initialValues={{
          email: "",
          username: "",
          password: "",
          iduser: "",
          phone: "",
          dateage: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <DatepickerWrapper
              val={val}
              SetVal={SetVal}
              vis={open}
              SetVis={SetOpen}
            />
            <FormStepsSignUp
              errors={errors}
              fields={fields}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              values={values}
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
          در حال حاضر اکانت فعال دارید؟
        </Text>
        <Btn
          title="ورود"
          Press={() => {
            navigation.navigate("LogIn", {
              Log: true,
            });
          }}
          Tstyle={{ fontSize: 15, color: "white" }}
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
    <>
      <Layout
        Bchildren={Bottom}
        Tchildren={<Top title="ثبت نام" desc={null} />}
        Negative={flexNegativeGrow}
        Positive={flexGrow}
        TopImageWidth={TopImageWidth}
        TopImageRight={TopImageRight}
        TopImageB={TopImageBottom}
        TopImageRotate={TopImageRotate}
      />
    </>
  );
});

export default SignUp;

const styles = StyleSheet.create({
  steps: {
    width: 35,
    height: 35,
    borderWidth: 2.5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    left: "5%",
    top: 20,
  },
  iconBack: {
    position: "absolute",
    right: "5%",
    top: 20,
  },
});
