import Toast from "react-native-toast-message";
import Http from "../interceptor/interceptor";

interface Props {
  email: string;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgetPass = async ({ email, setIsLoad }: Props) => {
  setIsLoad(true);
  try {
    const result = await Http.post(`forgetpassword`, {
      email: email,
    });
    setIsLoad(false);
    return true;
  } catch (error: any) {
    setIsLoad(false);
    if (error.response.status !== 405) {
      Toast.show({ text1: "مشکلی رخ داد", type: "error" });
    }
    return error.response.status;
  }
};

export { ForgetPass };
