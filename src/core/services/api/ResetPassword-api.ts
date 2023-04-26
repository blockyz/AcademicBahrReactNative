import Toast from "react-native-toast-message";
import Http from "../interceptor/interceptor";

interface Props {
  password: string;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
  Token: string;
}

const ResetPassword = async ({ password, setIsLoad, Token }: Props) => {
  try {
    setIsLoad(true);
    const result = await Http.post(`resetPassword/${Token}`, {
      password: password,
    });
    Toast.show({ text1: "با موفقیت انجام شد", type: "error" });
    setIsLoad(false);
    return true;
  } catch (error) {
    setIsLoad(false);
    Toast.show({ text1: "مشکلی رخ داد", type: "error" });
    return false;
  }
};

export { ResetPassword };
