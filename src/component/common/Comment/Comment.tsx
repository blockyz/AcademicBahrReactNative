import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState, FC } from "react";
import ImageLoader from "../imageloader/ImageLoader";
import CustomText from "../Text/CustomText";
import {
  CountSentences,
  handleDescription,
} from "../functions/handleDesciption";
import { Anim } from "../Animation/Animation";
import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import rootStore from "../../../store/Store";
import { Theme } from "../../../Types/Types";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";

type Props = {
  item: {
    verified: boolean;
    postId: string;
    username: string;
    comment: string;
    answer?: string;
  };
};

const Comment: FC<Props> = ({ item }) => {
  const str =
    "hi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi asshi ass";
  const increaseHeight = useRef(
    new Animated.Value(CountSentences(item.comment, 53.5) === 1 ? 95 : 115)
  ).current;
  const [h, SetH] = useState<number>(
    CountSentences(item.comment, 53.5) === 1 ? 95 : 115
  );

  const [show, SetShow] = useState<boolean>(false);
  const isfocused = useIsFocused();

  useEffect(() => {
    Anim(increaseHeight, h, 800);
  }, [h]);
  useEffect(() => {
    SetH(CountSentences(item.comment, 53.5) === 1 ? 95 : 115);
    SetShow(false);
  }, [isfocused]);
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as Theme;
  const theme = useTheme(mythem);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          elevation: 6,
          borderRadius: 20,
          marginTop: 20,
          paddingHorizontal: 10,
          backgroundColor: theme.CourseItem,
        }}
        onPress={() => {
          if (item.comment.length > 116) {
            if (!show) {
              SetH(h + (CountSentences(item.comment, 53.5) - 2) * 20);
              SetShow(true);
            } else {
              SetH(115);
              SetShow(false);
            }
          }
        }}
      >
        <Animated.View
          style={{
            height: increaseHeight,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 7,
              paddingBottom: 10,
            }}
          >
            <ImageLoader
              style={{
                width: 45,
                height: 45,
                borderRadius: 45,
                resizeMode: "cover",
              }}
              srcR={require("../../../assets/images/user.png")}
            />
            <CustomText
              style={{ fontSize: 17, color: "#002D85", marginRight: 10 }}
            >
              {item.username}
            </CustomText>
          </View>
          <CustomText
            style={{
              color: "#999999",
              fontSize: 13,
              // textAlign: "right",
            }}
          >
            {show ? item.comment : handleDescription(item.comment, 110)}
          </CustomText>
        </Animated.View>
      </TouchableOpacity>
      {item.answer && (
        <View
          style={{
            width: "95%",
            elevation: 6,
            borderRadius: 20,
            marginTop: 15,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: theme.CourseItem,
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingBottom: 10,
            }}
          >
            <ImageLoader
              style={{
                width: 45,
                height: 45,
                borderRadius: 45,
                resizeMode: "cover",
              }}
              srcR={require("../../../assets/images/admin.png")}
            />
            <CustomText
              style={{ fontSize: 17, color: "#002D85", marginRight: 10 }}
            >
              ادمین
            </CustomText>
          </View>
          <CustomText
            style={{
              color: "#999999",
              fontSize: 13,
              textAlign: "right",
            }}
          >
            {item.answer}
          </CustomText>
        </View>
      )}
    </>
  );
};

export default observer(Comment);

const styles = StyleSheet.create({
  Comment: {
    backgroundColor: "#fff",
    elevation: 6,
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
  },
});
