import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useRef, useState, useEffect } from "react";
import { AnimLoop } from "../../common/Animation/Animation";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import CustomText from "../../common/Text/CustomText";
import CourseItem from "../../common/CourseItem/CourseItem";
import ArrowRefresh from "../../../assets/images/svg/spinner.svg";
import SkeletonCourseItem from "../../common/skeleton/SkeletonCourseItem";

interface Props {
  condition: boolean;
  ErrCondition: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<object[] | object | null, unknown>>;
  data: readonly any[] | null | undefined;
  Cdata: object[] | null | undefined;
  RefetchingErrorCondition: boolean;
  extraData?: number;
}

const Layout: FC<Props> = ({
  condition,
  ErrCondition,
  RefetchingErrorCondition,
  refetch,
  data,
  Cdata,
  extraData = 0,
}) => {
  const [refresh, SetRefresh] = useState<boolean>(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const RefreshRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      {condition ? (
        <View style={{ paddingTop: 25 }}>
          {ErrCondition && (
            <Pressable
              onPress={() => {
                AnimLoop(rotation, 360, 1000, 0, Easing.linear, false);
                refetch().then(() => {
                  AnimLoop(rotation, 360, 1000, 500, Easing.linear, true);
                });
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 40,
                  elevation: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Animated.View
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{ rotate: RefreshRotation }],
                  }}
                >
                  <ArrowRefresh
                    width={"100%"}
                    height={"100%"}
                    fill={"#3A84FF"}
                  />
                </Animated.View>
              </View>
            </Pressable>
          )}
          {[1, 2, 3, 4, 5].map((x) => (
            <SkeletonCourseItem key={x} />
          ))}
        </View>
      ) : (
        <>
          <FlatList
            keyExtractor={(item) => item._id}
            style={styles.holder}
            data={data}
            extraData={extraData}
            ListEmptyComponent={() => <CustomText title="empty" />}
            renderItem={({ item, index }) => (
              <CourseItem item={item} index={index} Comment={Cdata} />
            )}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            refreshing={refresh}
            onRefresh={() => {
              SetRefresh(true);
              refetch().then(() => {
                SetRefresh(false);
              });
            }}
            contentContainerStyle={{ paddingBottom: 23 }}
            onEndReachedThreshold={0.1}
            ListFooterComponentStyle={{
              paddingBottom: 15,
            }}
            ListFooterComponent={
              <>
                {RefetchingErrorCondition ? (
                  <Pressable
                    onPress={() => {
                      AnimLoop(rotation, 360, 1000, 0, Easing.linear, false);
                      refetch().then(() => {
                        AnimLoop(rotation, 360, 1000, 500, Easing.linear, true);
                      });
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "white",
                        borderRadius: 40,
                        elevation: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Animated.View
                        style={{
                          width: 20,
                          height: 20,
                          transform: [{ rotate: RefreshRotation }],
                        }}
                      >
                        <ArrowRefresh
                          width={"100%"}
                          height={"100%"}
                          fill={"#3A84FF"}
                        />
                      </Animated.View>
                    </View>
                  </Pressable>
                ) : (
                  <CustomText style={{ textAlign: "center" }} title="The End" />
                )}
              </>
            }
          />
        </>
      )}
    </>
  );
};

export default Layout;
const styles = StyleSheet.create({
  holder: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
});
