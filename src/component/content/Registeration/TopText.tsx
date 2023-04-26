import { FC } from "react";
import { View } from "react-native";
import Text from "../../common/Text/CustomText";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";
type Props = {
  title: string;
  desc: string | null;
};

const text: string =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ... چاپ و";

const Top: FC<Props> = ({ title, desc = text }) => {
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flex: 1,
        marginTop: "30%",
      }}
    >
      <Text style={{ fontSize: 30, color: theme.topText }} title={title} />
      <Text
        style={{ fontSize: 14, color: theme.topText, marginTop: 13 }}
        title={desc ?? text}
      />
    </View>
  );
};

export default observer(Top);
