import { Animated, Easing } from "react-native";

const Anim = (
  flexGrow: Animated.Value,
  val: number,
  duration: number,
  delay: number = 0,
  easi: ((value: number) => number) | undefined = Easing.linear
) => {
  Animated.timing(flexGrow, {
    toValue: val,
    duration: duration,
    easing: easi,
    useNativeDriver: false,
    delay: delay,
  }).start();
};
const AnimLoop = (
  flexGrow: Animated.Value,
  val: number,
  duration: number,
  delay: number = 0,
  easi: ((value: number) => number) | undefined = Easing.linear,
  Stop: boolean = false
) => {
  Stop
    ? Animated.loop(
        Animated.timing(flexGrow, {
          toValue: val,
          duration: duration,
          easing: easi,
          useNativeDriver: false,
          delay: delay,
        }),
        { iterations: 1000 }
      ).stop()
    : Animated.loop(
        Animated.timing(flexGrow, {
          toValue: val,
          duration: duration,
          easing: easi,
          useNativeDriver: false,
          delay: delay,
        }),
        { iterations: 1000 }
      ).start();
};

export { Anim, AnimLoop };
