import { Platform } from "react-native";
import { Asset } from "react-native-image-picker";
import Http from "../interceptor/interceptor";

interface Props {
  setLoad: React.Dispatch<React.SetStateAction<string>>;
  image: Asset;
}

const UploadImage = async ({ image, setLoad }: Props) => {
  setLoad("درحال اپلود عکس");
  try {
    let img = new FormData();
    img.append("image", {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });
    const results = await Http.post(`upload/image`, img, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return results.data;
  } catch (error: any) {
    setLoad("مشکلی رخ داد دوباره امتحان کنید");
    return false;
  }
};

export { UploadImage };
