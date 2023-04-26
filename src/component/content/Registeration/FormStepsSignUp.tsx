import {
  StyleSheet,
  ActivityIndicator,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useRef, useState } from "react";
import { FormikErrors } from "formik";
import { Anim } from "../../common/Animation/Animation";
import CustomText from "../../common/Text/CustomText";
import Field from "../../common/Field/Field";
import Btn from "../../common/Button/Btn";

type values = {
  email: string;
  username: string;
  password: string;
  iduser: string;
  phone: string;
  dateage: string;
};
type Field = {
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
};
type Fields = Field[][];
type Props = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: {
    email: string;
    username: string;
    password: string;
    iduser: string;
    phone: string;
    dateage: string;
  };
  errors: FormikErrors<{
    email: string;
    username: string;
    password: string;
    iduser: string;
    phone: string;
    dateage: string;
  }>;
  fields: Fields;
  loading: boolean;
};

const FormStepsSignUp: React.FC<Props> = ({
  handleSubmit,
  errors,
  fields,
  handleChange,
  values,
  loading,
}) => {
  const [Step, SetStep] = useState(false);
  const FF = useRef(new Animated.Value(Step ? 180 : 0)).current;
  const SF = useRef(new Animated.Value(Step ? 180 : 0)).current;
  const THF = useRef(new Animated.Value(Step ? 180 : 0)).current;

  const FFZ = useRef(new Animated.Value(Step ? 0 : 1)).current;
  const SFZ = useRef(new Animated.Value(Step ? 0 : 1)).current;
  const THFZ = useRef(new Animated.Value(Step ? 0 : 1)).current;

  const FFZB = useRef(new Animated.Value(Step ? 1 : 0)).current;
  const SFZB = useRef(new Animated.Value(Step ? 1 : 0)).current;
  const THFZB = useRef(new Animated.Value(Step ? 1 : 0)).current;

  const FirstField = FF.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const SeccondField = SF.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const ThirdField = THF.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const SeccondFieldBackward = SF.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "0deg"],
  });
  const ThirdFieldBackward = THF.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "0deg"],
  });
  const FirstFieldBackward = FF.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "0deg"],
  });

  return (
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 220,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (Step) {
              Anim(FF, 0, 1000, 800);
              Anim(SF, 0, 1000, 500);
              Anim(THF, 0, 1000);
              Anim(FFZ, 1, 1000, 800);
              Anim(SFZ, 1, 1000, 500);
              Anim(THFZ, 1, 1000);
              Anim(FFZB, 0, 1000, 800);
              Anim(SFZB, 0, 1000, 500);
              Anim(THFZB, 0, 1000);
              SetStep(false);
            }
          }}
        >
          <View
            style={{
              opacity: Step ? 0.5 : 1,
              ...styles.steps,
              borderColor:
                errors.username || errors.phone || errors.iduser
                  ? "red"
                  : "white",
            }}
          >
            <CustomText style={{ color: "white", fontSize: 18 }}>1</CustomText>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: 130,
            height: 2,
            backgroundColor: "white",
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {
            if (!Step) {
              Anim(FFZ, 0, 1000);
              Anim(SFZ, 0, 1000, 500);
              Anim(THFZ, 0, 1000, 800);

              Anim(FFZB, 1, 1000);
              Anim(SFZB, 1, 1000, 500);
              Anim(THFZB, 1, 1000, 800);

              Anim(FF, 180, 1000);
              Anim(SF, 180, 1000, 500);
              Anim(THF, 180, 1000, 800);

              SetStep(true);
            }
          }}
        >
          <View
            style={{
              opacity: !Step ? 0.5 : 1,
              ...styles.steps,
              borderColor:
                errors.email || errors.dateage || errors.password
                  ? "red"
                  : "white",
            }}
          >
            <CustomText style={{ color: "white", fontSize: 18 }}>2</CustomText>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          transform: [{ perspective: 800 }],
        }}
      >
        {fields.map((i, x) => (
          <Animated.View
            key={x}
            style={{
              width: "100%",
              marginBottom: 4,
              height: 75,
              transform:
                x === 0
                  ? [{ rotateY: FirstField }, { perspective: 600 }]
                  : x === 1
                  ? [{ rotateY: SeccondField }, { perspective: 600 }]
                  : [{ rotateY: ThirdField }, { perspective: 600 }],
            }}
          >
            <>
              <View style={{ width: "100%" }}>
                {i.map((s, sx) => (
                  <View key={`${x}-${s.err}`}>
                    {sx === 1 ? (
                      <Animated.View
                        style={{
                          position: "absolute",
                          width: "100%",
                          transform: [
                            {
                              rotateX:
                                x === 0
                                  ? FirstField
                                  : x === 1
                                  ? SeccondField
                                  : ThirdField,
                            },
                          ],
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <CustomText style={{ color: "#fff" }}>
                          {errors[s.err as keyof values]}
                        </CustomText>
                      </Animated.View>
                    ) : (
                      <View style={{ transform: [{ rotateY: "180deg" }] }}>
                        <Animated.View
                          style={{
                            position: "absolute",
                            width: "100%",
                            transform: [
                              {
                                rotateX:
                                  x === 0
                                    ? FirstFieldBackward
                                    : x === 1
                                    ? SeccondFieldBackward
                                    : ThirdFieldBackward,
                              },
                            ],
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <CustomText style={{ color: "#fff" }}>
                            {errors[s.err as keyof values]}
                          </CustomText>
                        </Animated.View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              {i.map((s, sx) => (
                <Fragment key={`${sx + x}-${s.err}-${i}-${s}`}>
                  {sx === 0 ? (
                    <Animated.View
                      style={{
                        zIndex: x === 0 ? FFZB : x === 1 ? SFZB : THFZB,
                        position: "absolute",
                        width: "100%",
                        bottom: 0,
                      }}
                    >
                      <Field
                        value={
                          s.err === "dateage"
                            ? s.value
                            : values[s.err as keyof values]
                        }
                        placeholder={s.placeholder}
                        style={{
                          marginTop: 0,
                          marginBottom: 0,
                          transform: [{ rotateY: "180deg" }],
                        }}
                        KeboradShow={s.err === "dateage" ? false : true}
                        // onPressIn={() => SetOpen(true)}
                        onChangeText={
                          s.onChangeText
                            ? handleChange(s.onChangeText)
                            : undefined
                        }
                        onPressIn={s?.onPressIn}
                        passBool={s.passBool}
                      />
                      {s.icon && s.icon}
                      {s.iconBack}
                    </Animated.View>
                  ) : (
                    <Animated.View
                      style={{
                        zIndex: x === 0 ? FFZ : x === 1 ? SFZ : THFZ,
                        position: "absolute",
                        width: "100%",
                        bottom: 0,
                      }}
                    >
                      <Field
                        value={values[s.err as keyof values]}
                        onChangeText={handleChange(s.onChangeText)}
                        placeholder={s.placeholder}
                        style={{
                          marginTop: 0,
                          marginBottom: 0,
                        }}
                        passBool={s.passBool}
                        type={s.type ? s.type : undefined}
                      />
                      {s.icon && s.icon}
                      {s.iconBack}
                    </Animated.View>
                  )}
                </Fragment>
              ))}
            </>
          </Animated.View>
        ))}
      </View>
      <Btn
        title={Step ? "ورود" : "گام بعدی"}
        Press={() => {
          if (!Step) {
            Anim(FFZ, 0, 1000);
            Anim(SFZ, 0, 1000, 500);
            Anim(THFZ, 0, 1000, 800);

            Anim(FFZB, 1, 1000);
            Anim(SFZB, 1, 1000, 500);
            Anim(THFZB, 1, 1000, 800);

            Anim(FF, 180, 1000);
            Anim(SF, 180, 1000, 500);
            Anim(THF, 180, 1000, 800);

            SetStep(true);
          } else {
            handleSubmit();
          }
        }}
        disabled={loading}
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
  );
};

export default FormStepsSignUp;

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
