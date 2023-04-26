import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Text from "../Text/CustomText";
import React, { useState, FC, memo } from "react";
import Doctor from "../../../assets/images/svg/doctor.svg";
import Coin from "../../../assets/images/svg/coin.svg";
import Plus from "../../../assets/images/svg/plus.svg";
import Del from "../../../assets/images/svg/delete.svg";
import { handleDescription } from "../functions/handleDesciption";
import Btn from "../Button/Btn";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import LaziImageLoader from "../imageloader/LaziImageLoader";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";
import Toast from "react-native-toast-message";
import Like from "../Like/Like";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
type Props = {
  index: number;
  item: object;
  Comment: Array<object> | null | undefined;
};
type items = {
  title: string;
  teacher: {
    fullName: string;
    profile: string;
  };
  cost: number;
  lesson: {
    image: string;
    description: string;
  };
  startDate: string;
  endDate: string;
  students:
    | Array<{
        _id: string;
        fullName: string;
        email: string;
        profile: string;
      }>
    | [];
  capacity: number;
  _id: string;
};

const CourseItem: FC<Props> = ({ index, item, Comment }) => {
  const Course = item as items;
  const navigate = useNavigation();

  const route = useRoute();
  const BasketStore = rootStore.basket;
  const GetRegisterationStore = rootStore.getRegisterationData();
  const isItInBasket = (): boolean => {
    const bookmark = BasketStore.ShopingList.findIndex(
      (x) => x._id === Course._id
    );
    return bookmark !== -1 ? true : false;
  };

  const ButtonWraper = () => {
    if (route.name === "Cart") {
      return (
        <Btn
          Tstyle={{ display: "none" }}
          Vstyle={{
            width: 35,
            height: 35,
            backgroundColor: "#FF0000",
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
          Press={() => {
            BasketStore.RemoveCart(Course._id);
          }}
          children={<Del fill={"white"} width={16} />}
        />
      );
    } else {
      return (
        <Btn
          Tstyle={{ display: "none" }}
          Vstyle={{
            width: 35,
            height: 35,
            backgroundColor:
              isItInBasket() ||
              !GetRegisterationStore.Active ||
              Course.capacity === 0
                ? "#ccc"
                : "#4F91FF",
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
          Press={() => {
            if (GetRegisterationStore.Active) {
              !isItInBasket()
                ? Course.capacity === 0
                  ? Toast.show({
                      text1: "ظرفیت دوره تمام شده است",
                      type: "error",
                    })
                  : BasketStore.AddCart(Course)
                : Toast.show({ text1: "در سبد خرید موجود است", type: "info" });
            } else {
              Toast.show({ text1: "لطفا وارد شوید", type: "error" });
            }
          }}
          children={<Plus />}
        />
      );
    }
  };
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate.navigate("Detdrawer", {
          CourseItem: { Course: item, Comments: Comment },
        });
        navigate.getParent("Det").openDrawer({
          CourseItem: { Course: item, Comments: Comment },
        });
      }}
    >
      <View
        style={{
          width: "100%",
          height: 110,
          position: "relative",
          marginBottom: 23,
          paddingHorizontal: 10,
          marginTop: index === 0 ? 10 : 0,
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: theme.CourseItem,
            borderRadius: 20,
            height: "100%",
            elevation: 8,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row-reverse",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              height: "100%",
              flexDirection: "row-reverse",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: 15,
                  paddingLeft: 38,
                }}
              >
                <Text
                  style={{ fontSize: 17, color: theme.textColor }}
                  title={handleDescription(Course.title, 18)}
                />
              </View>
              <View
                style={{
                  paddingRight: 47,
                  paddingLeft: 8,
                  paddingTop: 18,
                  justifyContent: "space-between",
                  // alignItems: "flex-end",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: 6,
                      color: theme.textColorDescription,
                    }}
                    title={Course.teacher.fullName}
                  />
                  <Doctor />
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: 2,
                      color: "#696969",
                    }}
                    title={`ت`}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: 6,
                      color: "#E00000",
                    }}
                    title={`${Course.cost}`}
                  />
                  <Coin />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column-reverse",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              {ButtonWraper()}

              <Like id={Course._id} it={Course} />
            </View>
          </View>
        </View>
        <View
          style={{
            width: 70,
            height: "100%",
            borderRadius: 70,
            position: "absolute",
            zIndex: 1,
            justifyContent: "center",
            right: 0,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              elevation: 2,
              width: 70,
              height: 70,
              borderRadius: 70,
            }}
          >
            <LaziImageLoader
              src={Course.lesson.image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 70,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default observer(CourseItem);

const styles = StyleSheet.create({});
