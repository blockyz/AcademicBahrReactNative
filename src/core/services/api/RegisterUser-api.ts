import Toast from "react-native-toast-message";
import Http from "../interceptor/interceptor";
import { LogInStudent } from "./LogInStudent-api";
// main url of backend
// const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
interface Props {
  obj: val;
  SetLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface val {
  email: string;
  username: string;
  password: string;
  iduser: string;
  phone: string;
  dateage: string;
}
const RegisterUser = async ({ obj, SetLoading }: Props) => {
  const value = {
    email: obj.email,
    password: obj.password,
  };
  const logObj = {
    fullName: obj.username,
    email: obj.email,
    password: obj.password,
    phoneNumber: obj.phone,
    birthDate: obj.dateage,
    nationalId: obj.iduser,
    profile: "user.png",
  };
  try {
    SetLoading(true);
    const result = await Http.post(`auth/register`, logObj);
    Toast.show({ type: "success", text1: "با موفقیت ثبت نام شد" });
    LogInStudent({ value, SetLoading });
    return true;
  } catch (error: any) {
    SetLoading(false);
    if (error.response.status === 400) {
      Toast.show({ type: "error", text1: "ایمیل معتبر نیست" });
    } else if (error.response.status > 400) {
      Toast.show({ type: "error", text1: "کدملی یا ایمیل وجود دارد" });
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

export { RegisterUser };
