import { StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Btn from "../Button/Btn";
import { GestureResponderEvent } from "react-native-modal";
import { Anim } from "../Animation/Animation";

type Props = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  val: boolean;
};

const OnOff: React.FC<Props> = ({ onPress, val }) => {
  const IncreseLeft = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (val) {
      Anim(IncreseLeft, 24, 300, 0);
    } else {
      Anim(IncreseLeft, 0, 300, 0);
    }
  }, [val]);

  return (
    <Btn
      Vstyle={{
        width: 45,
        height: 20,
        borderRadius: 50,
        backgroundColor: "white",
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: "#cecece",
        justifyContent: "center",
        paddingHorizontal: 2,
      }}
      Tstyle={{ display: "none" }}
      Press={onPress}
    >
      <Animated.View
        style={{
          width: 15,
          height: 15,
          backgroundColor: val ? "#4F91FF" : "#ccc",
          borderRadius: 15,
          marginLeft: IncreseLeft,
        }}
      />
    </Btn>
  );
};

export default OnOff;

const styles = StyleSheet.create({});
