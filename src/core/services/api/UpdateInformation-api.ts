import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import rootStore from "../../../store/Store";
import Http from "../interceptor/interceptor";

type objects = {
  name: string;
  email: string;
  Phone: string;
  date: string;
  iduser: string;
  image: string;
};
interface Props {
  obj: objects;
  id: string;
  setApiLoad: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateInformation = async ({ obj, id, setApiLoad }: Props) => {
  const info = {
    fullName: obj.name,
    email: obj.email,
    phoneNumber: obj.Phone,
    birthDate: obj.date,
    nationalId: obj.iduser,
    profile: obj.image,
  };
  setApiLoad("درحال تغیر مشخصات");
  try {
    const results = await Http.put(`student/${id}`, info);
    AsyncStorage.setItem("user", JSON.stringify(results.data.result));
    rootStore.registration.SetUpdateUser(results.data.result);
    Toast.show({ text1: "با موفقیت مشخصات تغییر کردند", type: "success" });
    setApiLoad("");
    return results.data;
  } catch (error: any) {
    setApiLoad("مشکلی رخ داد دوباره امتحان کنید");
    return error.response.data;
  }
};

export { UpdateInformation };
