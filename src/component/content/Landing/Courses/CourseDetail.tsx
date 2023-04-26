import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import CustomeText from "../../../common/Text/CustomText";
import Plus from "../../../../assets/images/svg/plus.svg";
import Btn from "../../../common/Button/Btn";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "jalali-moment";
import { handleDescription } from "../../../common/functions/handleDesciption";
import LaziImageLoader from "../../../common/imageloader/LaziImageLoader";
import DrawerIcon from "../../../../assets/images/svg/Tab/8725699_dialpad_alt_icon.svg";
import Heart from "../../../../assets/images/svg/heart.svg";
import Heartfat from "../../../../assets/images/svg/heartfat.svg";
import Comment from "../../../common/Comment/Comment";
import { DrawerActions } from "@react-navigation/native";
import { useQuery } from "react-query";
import { GetAllLike } from "../../../../core/services/api/GetAllLike-api";
import Like from "../../../common/Like/Like";
import rootStore from "../../../../store/Store";
import { observer } from "mobx-react";
import Toast from "react-native-toast-message";
import { Theme } from "../../../../Types/Types";
import useTheme from "../../../../config/ThemeConfig/ThemeConfig";
import CommentModal from "../../../common/modal/CommentModal";

interface Props {
  It: Readonly<object | undefined>;
}
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
interface ComentIt {
  verified: boolean;
  postId: string;
  _id: string;
  username: string;
  comment: string;
  answer?: string;
}
const CourseDetail = ({ It }: Props) => {
  const { height, width } = Dimensions.get("screen");
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as Theme;
  const theme = useTheme(mythem);

  const navbarHeight = (31 * height) / 100;
  const CourseItem: items = It?.CourseItem?.Course;
  const ComentsItem: Array<ComentIt> = It?.CourseItem?.Comments;
  const BasketStore = rootStore.basket;
  const GetRegisterationStore = rootStore.getRegisterationData();

  const isItInBasket = (): boolean => {
    const bookmark = BasketStore.ShopingList.findIndex(
      (x) => x._id === CourseItem._id
    );
    return bookmark !== -1 ? true : false;
  };

  const fix = moment.from(CourseItem && CourseItem.endDate.toString(), "fa");
  const CorseDateForm =
    (new Date(fix.format()).getTime() - new Date().getTime()) /
    (1000 * 3600 * 24);

  const CorseDate =
    CorseDateForm <= 0
      ? "منسوخ"
      : CorseDateForm < 30
      ? "( " + Math.floor(CorseDateForm) + " روز )"
      : "( " +
        Math.floor(CorseDateForm / 30) +
        "ماه و " +
        Math.floor(CorseDateForm % 30) +
        "روز )";

  const CommentFiltered =
    ComentsItem &&
    ComentsItem.filter(
      (x) => x.postId === CourseItem._id && x.verified === true
    );
  const navigation = useNavigation();

  const [modalShow, SetModalShow] = useState<boolean>(false);

  if (CourseItem || ComentsItem) {
    return (
      <View style={{ height: height }}>
        <View style={{ height: navbarHeight }}>
          <View
            style={{
              top: 0,
              backgroundColor: "white",
            }}
          >
            <LaziImageLoader
              style={{
                width: "100%",
                height: "100%",
                alignSelf: "center",
              }}
              src={CourseItem.lesson.image}
            />
            <View
              style={{
                width: "100%",
                top: 40,
                zIndex: 2,
                position: "absolute",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 30,
                elevation: 10,
              }}
            >
              <Like style={styles.circle} id={CourseItem._id} it={CourseItem} />

              <Btn
                Press={() => {
                  navigation.dispatch(
                    DrawerActions.jumpTo("drawer", { open: true })
                  );
                }}
                Vstyle={styles.circle}
                Tstyle={{ display: "none" }}
                children={
                  <DrawerIcon fill={"#03B9FF"} width={22} height={22} />
                }
              />
            </View>
          </View>
        </View>
        <View
          style={{
            alignSelf: "center",
            backgroundColor: theme.backMode1,
            width: "100%",
            height: height - navbarHeight + 40,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            top: -40,
            elevation: 10,
          }}
        >
          <View
            style={{
              bottom: 15,
              position: "absolute",
              zIndex: 2,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                width: (width * 84) / 100,
                height: (height * 6.5) / 100,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: !isItInBasket() ? "#04A641" : "red",
                borderRadius: 30,
              }}
              onPress={() => {
                GetRegisterationStore.Active
                  ? isItInBasket()
                    ? Toast.show({
                        text1: "در سبد خرید موجود است",
                        type: "info",
                      })
                    : CourseItem.capacity === 0
                    ? Toast.show({
                        text1: "ظرفیت دوره تمام شده است",
                        type: "error",
                      })
                    : BasketStore.AddCart(CourseItem)
                  : navigation.navigate("LogIn");
              }}
            >
              <CustomeText style={{ color: "#fff", fontSize: 20 }}>
                {GetRegisterationStore.Active
                  ? isItInBasket()
                    ? "در سبد خرید موجودست"
                    : CourseItem.capacity === 0
                    ? "ظرفیت تمام شده است"
                    : "افزودن به سبد خرید"
                  : "ورود"}
              </CustomeText>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
              <LaziImageLoader
                src={CourseItem.teacher.profile}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70,
                  resizeMode: "cover",
                  top: -35,
                }}
              />
              <View style={{ marginRight: 4 }}>
                <CustomeText
                  style={{
                    fontSize: 15,
                    color: theme.textcolorDescription2,
                    marginRight: 11,
                    textAlign: "right",
                  }}
                >
                  {handleDescription(CourseItem.teacher.fullName, 20)}
                </CustomeText>
                <CustomeText
                  style={{
                    fontSize: 20,
                    color: theme.textcolorActive,
                    textAlign: "right",
                  }}
                >
                  {handleDescription(CourseItem.title, 20)}
                </CustomeText>
              </View>
            </View>
            <View
              style={{
                alignSelf: "center",
                width: "80%",
                height: 1,
                elevation: 4,
                backgroundColor: "white",
                marginBottom: 25,
              }}
            ></View>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 30, paddingBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <CustomeText
                  style={{ fontSize: 13, color: theme.textcolorDescription3 }}
                >
                  تاریخ شروع :
                </CustomeText>
                <CustomeText
                  style={{
                    fontSize: 15,
                    color: theme.textcolorActive,
                  }}
                >
                  {new Date(CourseItem.startDate).toLocaleDateString("en-Us", {
                    day: "2-digit",
                  }) +
                    "/" +
                    new Date(CourseItem.startDate).toLocaleDateString("fa-IR", {
                      month: "long",
                    }) +
                    "/" +
                    new Date(CourseItem.startDate).toLocaleDateString("en-Us", {
                      year: "numeric",
                    })}
                </CustomeText>
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row-reverse" }}>
                  <CustomeText
                    style={{
                      fontSize: 13,
                      color: theme.textcolorDescription3,
                      marginLeft: 5,
                    }}
                  >
                    دانشجو :
                  </CustomeText>
                  <CustomeText
                    style={{ fontSize: 15, color: theme.textcolorActive }}
                  >
                    {CourseItem.students.length + " نفر"}
                  </CustomeText>
                </View>
                <View style={{ flexDirection: "row-reverse" }}>
                  <CustomeText
                    style={{
                      fontSize: 13,
                      color: theme.textcolorDescription3,
                      marginLeft: 5,
                    }}
                  >
                    ظرفیت :
                  </CustomeText>
                  <CustomeText
                    style={{ fontSize: 15, color: theme.textcolorActive }}
                  >
                    {CourseItem.capacity + " نفر"}
                  </CustomeText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <CustomeText
                  style={{ fontSize: 13, color: theme.textcolorDescription4 }}
                >
                  {CorseDate.toString()}
                </CustomeText>
                <CustomeText style={{ fontSize: 29, color: "#CE3E2E" }}>
                  {CourseItem.cost + " ت"}
                </CustomeText>
              </View>
              <View>
                <CustomeText
                  style={{ fontSize: 15, color: theme.textcolorDescription4 }}
                >
                  توضیحات دوره:
                </CustomeText>
                <CustomeText
                  style={{ fontSize: 12, color: "#818181", marginTop: 10 }}
                >
                  {handleDescription(CourseItem.lesson.description, 120)}
                </CustomeText>
                {CourseItem.lesson.description.length > 120 && (
                  <CustomeText
                    style={{
                      fontSize: 13,
                      color: "#009EDA",
                      alignSelf: "flex-start",
                    }}
                  >
                    بیشتر ...
                  </CustomeText>
                )}
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                    height: 30,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Btn
                      Vstyle={{
                        backgroundColor: "#03B9FF",
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                      }}
                      Tstyle={{ display: "none" }}
                      Press={() => SetModalShow(true)}
                    >
                      <Plus />
                    </Btn>
                    <CustomeText
                      style={{ fontSize: 13, color: "#009EDA", marginLeft: 5 }}
                      onPress={() => SetModalShow(true)}
                    >
                      نظر جدید
                    </CustomeText>
                  </View>
                  <CustomeText
                    style={{ fontSize: 15, color: theme.textcolorDescription4 }}
                  >
                    نظرات کاربران:
                  </CustomeText>
                </View>
              </View>
              {CommentFiltered.length === 0 ? (
                <CustomeText
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    color: "#bbb",
                    fontSize: 24,
                  }}
                >
                  نظری ثبت نشده است
                </CustomeText>
              ) : (
                CommentFiltered.map((c) => <Comment item={c} key={c._id} />)
              )}

              <View style={{ height: 100 }}></View>
            </View>
          </ScrollView>
        </View>
        <CommentModal
          id={CourseItem._id}
          visible={modalShow}
          setVisible={SetModalShow}
        />
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default observer(CourseDetail);

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
