import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import Btn from "../Button/Btn";
import FilterSvg from "../../../assets/images/svg/filter.svg";
import Basket from "../../../assets/images/svg/basket.svg";
import { useRoute } from "@react-navigation/native";
import Field from "../Field/Field";
import Srch from "../../../assets/images/svg/search.svg";
import Filter from "../modal/Filter";
import { observer, inject } from "mobx-react";
import rootStore from "../../../store/Store";

type Props = {};

const CoursesNavbar: FC<Props> = ({}) => {
  const filteringStore = rootStore.filteringStore;
  const GetfilteringStore = rootStore.getFilteringData();

  const route = useRoute();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      {route.name === "Course" && (
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: "8%",
            alignItems: "center",
          }}
        >
          <Btn
            Vstyle={styles.Vstyle}
            Tstyle={{ display: "none" }}
            children={<FilterSvg />}
            Press={() => {
              setVisible(true);
            }}
          />
          <View
            style={{
              width: "55%",
              height: 37,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 37,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                width: "18%",
                backgroundColor: "#D5E4FF",
                height: "100%",
                borderTopLeftRadius: 37,
                borderBottomLeftRadius: 37,
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.7}
            >
              <Srch />
            </TouchableOpacity>
            <Field
              placeholder="جستجو ..."
              style={{
                width: "83%",
                height: "100%",
                paddingRight: 9,
                fontSize: 13,
                alignSelf: "center",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              type="search"
              value={GetfilteringStore.somedata}
              onChangeText={(text) => filteringStore?.SetData(text)}
            />
          </View>
          <Btn
            Vstyle={styles.Vstyle}
            Tstyle={{ display: "none" }}
            children={<Basket />}
          />
        </View>
      )}
      <Filter setVisible={setVisible} visible={visible} />
    </>
  );
};

export default observer(CoursesNavbar);

const styles = StyleSheet.create({
  Vstyle: {
    width: 37,
    height: 37,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 37,
  },
});
