import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  useWindowDimensions,
} from "react-native";
import React, { FC } from "react";
import Modal from "react-native-modal";
import * as animatable from "react-native-animatable";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
  Modalstyle?: StyleProp<ViewStyle>;
  animIn?:
    | "bounce"
    | "flash"
    | "jello"
    | "pulse"
    | "rotate"
    | "rubberBand"
    | "shake"
    | "swing"
    | "tada"
    | "wobble"
    | "bounceIn"
    | "bounceInDown"
    | "bounceInUp"
    | "bounceInLeft"
    | "bounceInRight"
    | "bounceOut"
    | "bounceOutDown"
    | "bounceOutUp"
    | "bounceOutLeft"
    | "bounceOutRight"
    | "fadeIn"
    | "fadeInDown"
    | "fadeInDownBig"
    | "fadeInUp"
    | "fadeInUpBig"
    | "fadeInLeft"
    | "fadeInLeftBig"
    | "fadeInRight"
    | "fadeInRightBig"
    | "fadeOut"
    | "fadeOutDown"
    | "fadeOutDownBig"
    | "fadeOutUp"
    | "fadeOutUpBig"
    | "fadeOutLeft"
    | "fadeOutLeftBig"
    | "fadeOutRight"
    | "fadeOutRightBig"
    | "flipInX"
    | "flipInY"
    | "flipOutX"
    | "flipOutY"
    | "lightSpeedIn"
    | "lightSpeedOut"
    | "slideInDown"
    | "slideInUp"
    | "slideInLeft"
    | "slideInRight"
    | "slideOutDown"
    | "slideOutUp"
    | "slideOutLeft"
    | "slideOutRight"
    | "zoomIn"
    | "zoomInDown"
    | "zoomInUp"
    | "zoomInLeft"
    | "zoomInRight"
    | "zoomOut"
    | "zoomOutDown"
    | "zoomOutUp"
    | "zoomOutLeft"
    | "zoomOutRight"
    | animatable.CustomAnimation<
        import("react-native").TextStyle &
          ViewStyle &
          import("react-native").ImageStyle
      >;
  animOut?:
    | "bounce"
    | "flash"
    | "jello"
    | "pulse"
    | "rotate"
    | "rubberBand"
    | "shake"
    | "swing"
    | "tada"
    | "wobble"
    | "bounceIn"
    | "bounceInDown"
    | "bounceInUp"
    | "bounceInLeft"
    | "bounceInRight"
    | "bounceOut"
    | "bounceOutDown"
    | "bounceOutUp"
    | "bounceOutLeft"
    | "bounceOutRight"
    | "fadeIn"
    | "fadeInDown"
    | "fadeInDownBig"
    | "fadeInUp"
    | "fadeInUpBig"
    | "fadeInLeft"
    | "fadeInLeftBig"
    | "fadeInRight"
    | "fadeInRightBig"
    | "fadeOut"
    | "fadeOutDown"
    | "fadeOutDownBig"
    | "fadeOutUp"
    | "fadeOutUpBig"
    | "fadeOutLeft"
    | "fadeOutLeftBig"
    | "fadeOutRight"
    | "fadeOutRightBig"
    | "flipInX"
    | "flipInY"
    | "flipOutX"
    | "flipOutY"
    | "lightSpeedIn"
    | "lightSpeedOut"
    | "slideInDown"
    | "slideInUp"
    | "slideInLeft"
    | "slideInRight"
    | "slideOutDown"
    | "slideOutUp"
    | "slideOutLeft"
    | "slideOutRight"
    | "zoomIn"
    | "zoomInDown"
    | "zoomInUp"
    | "zoomInLeft"
    | "zoomInRight"
    | "zoomOut"
    | "zoomOutDown"
    | "zoomOutUp"
    | "zoomOutLeft"
    | "zoomOutRight"
    | animatable.CustomAnimation<
        import("react-native").TextStyle &
          ViewStyle &
          import("react-native").ImageStyle
      >;
};

const ModalWrapper: FC<Props> = ({
  visible,
  setVisible,
  children,
  style,
  animIn = "fadeInLeftBig",
  animOut = "fadeOutRightBig",
  Modalstyle,
}) => {
  const { height } = useWindowDimensions();
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  return (
    <Modal
      deviceHeight={height + 50}
      statusBarTranslucent
      animationIn={animIn}
      animationOut={animOut}
      animationOutTiming={1000}
      animationInTiming={1000}
      style={
        Modalstyle
          ? Modalstyle
          : {
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: "8%",
              paddingVertical: "8.5%",
              margin: 0,
            }
      }
      onBackdropPress={() => setVisible(false)}
      backdropColor={theme.drawerOverlay}
      isVisible={visible}
    >
      <View
        style={
          style
            ? style
            : {
                borderRadius: 30,
                backgroundColor: "white",
                width: "100%",
                // height: "100%",
                paddingHorizontal: "10%",
                paddingVertical: "5.5%",
              }
        }
      >
        {children}
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({});
