import Toast from "react-native-toast-message";
import Http from "../interceptor/interceptor";
interface Props {
  obj: { id: string; userid: string };
  setIsLoad: React.Dispatch<React.SetStateAction<boolean | null>>;
}
const DisLikeApi = async ({ obj, setIsLoad }: Props) => {
  setIsLoad(true);
  try {
    const result = await Http.post(`course/dislike`, {
      courseId: obj.id,
      userId: obj.userid,
    });
    setIsLoad(false);
    Toast.show({ text1: "با موفقیت دیس لایک شد", type: "success" });
    return true;
  } catch (error) {
    setIsLoad(false);
    Toast.show({ text1: "مشکلی رخ داد", type: "error" });
    return false;
  }
};

export { DisLikeApi };
