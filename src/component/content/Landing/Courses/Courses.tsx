import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import React, { FC, useState, useEffect, useRef } from "react";
import CourseItem from "../../../common/CourseItem/CourseItem";
import { useQueries, useQuery } from "react-query";
import { GetAllCourses } from "../../../../core/services/api/GetAllCourses-api";
import CustomText from "../../../common/Text/CustomText";
import ArrowRefresh from "../../../../assets/images/svg/spinner.svg";
import { AnimLoop } from "../../../common/Animation/Animation";
import { observer, inject } from "mobx-react";
import { useIsFocused } from "@react-navigation/native";
import { useDebounce } from "use-debounce";
import rootStore from "../../../../store/Store";
import SkeletonCourseItem from "../../../common/skeleton/SkeletonCourseItem";
import { GetAllComment } from "../../../../core/services/api/GetAllComment-api";
import Layout from "../Layout";

type Props = {};

interface ItemCourses {
  title: string;
  teacher: {
    fullName: string;
  };
  cost: number;
  lesson: {
    image: string;
  };
  startDate: Date;
  students: object[];
  capacity: number;
}

const Courses: FC<Props> = ({}) => {
  const [refresh, SetRefresh] = useState<boolean>(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const RefreshRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const filteringStore = rootStore.filteringStore;
  const GetfilteringStore = rootStore.getFilteringData();
  const [debouncedVal] = useDebounce(GetfilteringStore.somedata, 500);

  const result = useQueries([
    { queryKey: "Courses", queryFn: GetAllCourses },
    { queryKey: "Comment", queryFn: GetAllComment },
  ]);
  const {
    data,
    refetch,
    isLoading,
    isError,
    isRefetchError,
    isRefetching,
    isFetching,
  } = result[0];
  const {
    data: ComentData,
    isLoading: CommentLoading,
    isError: CommentIsError,
    refetch: CommentRefetch,
    isFetching: CommentFetching,
  } = result[1];

  const CourseItems = data as [ItemCourses] | undefined;

  useEffect(() => {
    filteringStore.SetData("");
  }, [isFocused]);

  const FilterMode = GetfilteringStore.isOn;
  const SortDir = FilterMode
    ? GetfilteringStore.SubmitFilter.sortdir === "asc"
      ? true
      : false
    : true;
  const SortOp =
    GetfilteringStore.SubmitFilter.searchOp === "Course" ? true : false;
  const Sort = GetfilteringStore.SubmitFilter.sort;
  const filterCourses = CourseItems?.filter((c) => {
    if (FilterMode) {
      if (debouncedVal === "") {
        return (
          c &&
          GetfilteringStore.SubmitFilter.cost[0] <= c.cost &&
          c.cost <= GetfilteringStore.SubmitFilter.cost[1] &&
          GetfilteringStore.SubmitFilter.capacity[0] <= c.capacity &&
          c.capacity <= GetfilteringStore.SubmitFilter.capacity[1]
        );
      } else {
        if (SortOp) {
          return (
            c.title.toLowerCase().includes(debouncedVal.toLowerCase()) &&
            GetfilteringStore.SubmitFilter.cost[0] <= c.cost &&
            c.cost <= GetfilteringStore.SubmitFilter.cost[1] &&
            GetfilteringStore.SubmitFilter.capacity[0] <= c.capacity &&
            c.capacity <= GetfilteringStore.SubmitFilter.capacity[1]
          );
        } else {
          return (
            c.teacher.fullName
              .toLowerCase()
              .includes(debouncedVal.toLowerCase()) &&
            GetfilteringStore.SubmitFilter.cost[0] <= c.cost &&
            c.cost <= GetfilteringStore.SubmitFilter.cost[1] &&
            GetfilteringStore.SubmitFilter.capacity[0] <= c.capacity &&
            c.capacity <= GetfilteringStore.SubmitFilter.capacity[1]
          );
        }
      }
    } else {
      if (debouncedVal === "") {
        return c; // &&  c.cost === "smth"
      } else return c.title.toLowerCase().includes(debouncedVal);
    }
  });

  const collator = new Intl.Collator("fa");

  const handleSorting = (): ItemCourses[] | undefined => {
    if (FilterMode) {
      if (filterCourses) {
        return Sort === "cost"
          ? filterCourses.sort(
              (a, b) =>
                (b.cost && b.cost ? b.cost : 0) -
                (a.cost && a.cost ? a.cost : 0)
            )
          : Sort === "name"
          ? filterCourses.sort((a, b) =>
              collator.compare(a.title, b.title) <
              collator.compare(b.title, a.title)
                ? -1
                : 1
            )
          : Sort === "date"
          ? filterCourses.sort(
              (a, b) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime()
            )
          : Sort === "students"
          ? filterCourses.sort(
              (a, b) =>
                (b.students.length && b.students.length
                  ? b.students.length
                  : 0) -
                (a.students.length && a.students.length ? a.students.length : 0)
            )
          : Sort === "cpacity"
          ? filterCourses.sort(
              (a, b) =>
                (b.capacity && b.capacity ? b.capacity : 0) -
                (a.capacity && a.capacity ? a.capacity : 0)
            )
          : filterCourses;
      }
    } else {
      return filterCourses;
    }
  };

  return (
    <>
      <Layout
        Cdata={ComentData}
        data={SortDir ? handleSorting() : handleSorting()?.reverse()}
        refetch={isError ? refetch : CommentIsError ? CommentRefetch : refetch}
        condition={
          CommentFetching ||
          isLoading ||
          !CourseItems ||
          isRefetching ||
          !filterCourses ||
          CommentLoading
        }
        ErrCondition={
          (isError || CommentIsError) && (CommentFetching || isFetching)
        }
        RefetchingErrorCondition={isRefetchError}
      />
    </>
  );
};

export default observer(Courses);

const styles = StyleSheet.create({
  holder: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
});
