import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import rootStore from "../../../store/Store";
import Http from "../interceptor/interceptor";

type Props = {
  value: {
    email: string;
    password: string;
  };
  SetLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LogInStudent = async ({ value, SetLoading }: Props) => {
  SetLoading(true);
  try {
    const result = await Http.post("/auth/login", value);
    AsyncStorage.setItem(
      "user",
      JSON.stringify(result.data.result.studentModel)
    );
    AsyncStorage.setItem("token", result.data.result.jwtToken);
    rootStore.registration.SetActive(
      result.data.result.studentModel,
      result.data.result.jwtToken
    );
    Toast.show({ type: "success", text1: "خوشامدی" });
    SetLoading(false);
    return true;
  } catch (error: any) {
    SetLoading(false);
    if (error.response.status === 400) {
      Toast.show({ type: "error", text1: "ایمیل معتبر نیست" });
    } else if (error.response.status > 400) {
      Toast.show({ type: "error", text1: "ایمیل وجود دارد" });
    } else if (error.request.status === 0) {
      Toast.show({
        type: "error",
        text1: "مشکلی رخ داده اینترنت خود را چک کنید",
      });
    } else {
      Toast.show({ type: "error", text1: "مشکلی رخ داده است" });
    }
    return false;
  }
};
