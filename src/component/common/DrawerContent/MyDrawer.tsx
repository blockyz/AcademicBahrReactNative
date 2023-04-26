import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC } from "react";
import User from "../../../assets/images/svg/user.svg";
import Exit from "../../../assets/images/svg/exit.svg";
import Off from "../../../assets/images/svg/off.svg";
import Cog from "../../../assets/images/svg/cog.svg";
import Heart from "../../../assets/images/svg/heart.svg";
import Cart from "../../../assets/images/svg/Tab/8726292_shopping_basket_icon.svg";
import File from "../../../assets/images/svg/Tab/8725956_file_alt_icon.svg";
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import Btn from "../Button/Btn";
import ImageLoader from "../imageloader/ImageLoader";
import CustomeText from "../Text/CustomText";
import { observer } from "mobx-react";
import rootStore from "../../../store/Store";
import { handleDescription } from "../functions/handleDesciption";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
const drawerBar = [
  {
    title: "پروفایل کاربری",
    icon: User,
    href: "Profile",
  },
  {
    title: "دوره‌ها",
    icon: File,
    href: "Course",
  },
  {
    title: "علاقمندی‌ها",
    icon: Heart,
    href: "Fave",
  },
  {
    title: "سبد خرید",
    icon: Cart,
    href: "Cart",
  },
  {
    title: "تنظیمات",
    icon: Cog,
    href: "Setting",
  },
];

const MyDrawer = ({ props }: any): JSX.Element => {
  //DetdrawerW
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  const Field = props.state.routes[0].params?.Field;
  const handleColor = ({
    index,
    ActiveColor = theme.textcolorActive,
    DeActiveColor = "#686868",
  }: {
    index: number;
    ActiveColor?: string;
    DeActiveColor?: string;
  }): string => {
    switch (Field) {
      case "Course":
      case undefined:
        return index === 1 ? ActiveColor : DeActiveColor;
      case "Cart":
        return index === 3 ? ActiveColor : DeActiveColor;
      case "Fave":
        return index === 2 ? ActiveColor : DeActiveColor;
      case "Setting":
        return index === 4 ? ActiveColor : DeActiveColor;
      case "Profile":
        return index === 0 ? ActiveColor : DeActiveColor;
      default:
        return DeActiveColor;
    }
  };

  const UserStore = rootStore.registration;
  const GetUserStore = rootStore.getRegisterationData();
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingBottom: 60,
        paddingTop: 50,
        height: "100%",
        backgroundColor: theme.drawer,
      }}
    >
      <View style={{ position: "absolute", left: 18 }}>
        <Btn
          Vstyle={{}}
          Press={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
          <Exit height={20} width={20} />
        </Btn>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageLoader
            key={GetUserStore.user.profile}
            style={{ height: 100, width: 100, borderRadius: 50 }}
            IMAGE_NOT_FOUND={require("../../../assets/images/user.png")}
            src={
              GetUserStore.user.profile
                ? GetUserStore.user.profile
                : "NotFouund"
            }
          />
          <CustomeText
            style={{ color: theme.textColor, fontSize: 25, marginTop: 10 }}
          >
            {GetUserStore.Active
              ? handleDescription(GetUserStore.user.fullName, 12)
              : "میهمان"}
          </CustomeText>
        </View>
        <View>
          {drawerBar.map(
            (item, index) =>
              (GetUserStore.Active || (index > 0 && index < 4)) && (
                <Btn
                  Vstyle={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    marginBottom: 17,
                  }}
                  Tstyle={{
                    color: handleColor({ index }),
                    fontSize: 17,
                    marginRight: 15,
                  }}
                  Press={() => {
                    props.navigation.navigate(item.href);
                  }}
                  title={item.title}
                  key={index}
                >
                  <item.icon
                    fill={handleColor({ index, DeActiveColor: "gray" })}
                    height={20}
                    width={20}
                  />
                </Btn>
              )
          )}
        </View>
        {GetUserStore.Active ? (
          <Btn
            Press={() => UserStore.SetDeActive()}
            Vstyle={{
              backgroundColor: "#FFF4F4",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              flexDirection: "row",
              height: 40,
              alignSelf: "center",
            }}
            title="خروج از حساب"
            Tstyle={{ fontSize: 15, color: "#FF2B2B" }}
          >
            <Off width={15} height={15} />
          </Btn>
        ) : (
          <Btn
            Press={() => props.navigation.navigate("LogIn")}
            Vstyle={{
              backgroundColor: theme.drawerButtenLogin,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              flexDirection: "row",
              height: 40,
              alignSelf: "center",
            }}
            title="ورود"
            Tstyle={{ fontSize: 15, color: theme.textColor }}
          ></Btn>
        )}
      </View>
    </View>
  );
};

export default observer(MyDrawer);

const styles = StyleSheet.create({});
