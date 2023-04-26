import { AxiosRequestConfig } from "axios";
import Http from "../interceptor/interceptor";

interface Props {
  obj: {
    term: string;
    userid: string;
  };
  id: string;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  termId: string;
  userId: string;
  like: boolean;
}

const GetAllLike = async ({ obj, id, setIsLoad }: Props) => {
  setIsLoad(true);
  try {
    const result = await Http.get(`course/likeCount/${id}`, {
      termId: obj.term,
      userId: obj.userid,
      like: true,
    } as CustomAxiosRequestConfig);
    setIsLoad(false);
    return result.data.result;
  } catch (error) {
    setIsLoad(false);
    return false;
  }
};

export { GetAllLike };
