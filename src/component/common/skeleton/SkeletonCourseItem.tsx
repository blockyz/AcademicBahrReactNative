import { Text, View } from "react-native";
import React, { FC } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../store/Store";

type Props = {};

const SkeletonCourseItem: FC<Props> = ({}): any => {
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        marginBottom: 23,
        marginTop: 10,
        paddingHorizontal: 30,
      }}
    >
      <View>
        <View
          style={{
            width: "90%",
            height: "100%",
            backgroundColor: theme.CourseItem,
            borderRadius: 20,
            marginBottom: 19,
            paddingRight: 38,
            paddingLeft: 15,
            paddingTop: 6,
            elevation: 8,
            justifyContent: "space-between",
            paddingBottom: 14,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingLeft: 5,
            }}
          >
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item width={22} height={20} />
            </SkeletonPlaceholder>

            <View style={{ height: 20 }}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item width={80} height={20} />
              </SkeletonPlaceholder>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item width={90} height={20} />
                </SkeletonPlaceholder>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item width={90} height={20} />
                </SkeletonPlaceholder>
              </View>
            </View>
            <View
              style={{
                alignSelf: "flex-start",
                width: 35,
                height: 35,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  width={35}
                  height={35}
                  borderRadius={50}
                />
              </SkeletonPlaceholder>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            height: "100%",
            right: 0,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              elevation: 2,
              borderRadius: 50,
            }}
          >
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={70}
                height={70}
                borderRadius={70}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonCourseItem;
