import {
  ErrorToast,
  SuccessToast,
  InfoToast,
} from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <SuccessToast
      {...props}
      style={{
        borderRightColor: "green",
        borderLeftColor: "white",
        borderLeftWidth: 0,
        borderRightWidth: 6,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "200",
        fontFamily: "Yekanbakh",
      }}
      text2Style={{
        fontFamily: "Yekanbakh",
        fontSize: 13,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      style={{
        borderRightColor: "red",
        borderLeftColor: "white",
        borderLeftWidth: 0,
        borderRightWidth: 6,
      }}
      {...props}
      text1Style={{
        fontSize: 15,
        fontFamily: "Yekanbakh",
        fontWeight: "200",
      }}
      text2Style={{
        fontFamily: "Yekanbakh",
        fontSize: 13,
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      style={{
        borderRightColor: "blue",
        borderLeftColor: "white",
        borderLeftWidth: 0,
        borderRightWidth: 6,
      }}
      {...props}
      text1Style={{
        fontSize: 15,
        fontFamily: "Yekanbakh",
        fontWeight: "200",
      }}
      text2Style={{
        fontFamily: "Yekanbakh",
        fontSize: 13,
      }}
    />
  ),
  // مثلا از خودمون از صفر بسازیم
  // tomatoToast: ({ text1, props }: any) => (
  //   <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
  //     <CustomeText>{text1}</CustomeText>
  //     <CustomeText>{props.uuid}</CustomeText>
  //   </View>
  // ),
};
