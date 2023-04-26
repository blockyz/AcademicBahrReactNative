import Toast from "react-native-toast-message";
import Http from "../interceptor/interceptor";

interface Props {
  id: string;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetStudentById = async ({ id, setIsLoad }: Props) => {
  try {
    setIsLoad(true);
    const result = await Http.post(`student/${id}`);
    setIsLoad(false);
    return result.data.result;
  } catch (error) {
    setIsLoad(false);
    Toast.show({ text1: "مشکلی رخ داد", type: "error" });
    return false;
  }
};

export { GetStudentById };
