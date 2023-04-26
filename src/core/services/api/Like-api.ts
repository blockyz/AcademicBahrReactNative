import Toast from "react-native-toast-message";
import Http from "../interceptor/interceptor";

interface Props {
  obj: { id: string; userid: string };
  setIsLoad: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const LikeApi = async ({ obj, setIsLoad }: Props) => {
  try {
    setIsLoad(true);
    const result = await Http.post(`course/like`, {
      courseId: obj.id,
      userId: obj.userid,
    });
    setIsLoad(false);
    Toast.show({ text1: "با موفقیت لایک شد", type: "success" });
    return true;
  } catch (error) {
    setIsLoad(false);
    Toast.show({ text1: "مشکلی رخ داد", type: "error" });
    return false;
  }
};

export { LikeApi };
