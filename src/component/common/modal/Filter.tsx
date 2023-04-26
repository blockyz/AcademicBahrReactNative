import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { FC, useState, useRef, useEffect } from "react";
import CustomeText from "../Text/CustomText";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ModalWrapper from "./ModalWrapper";
import RadioButton from "../RadioButton/RadioButton";
import rootStore from "../../../store/Store";
import { observer } from "mobx-react";
import Btn from "../Button/Btn";
import { Anim } from "../Animation/Animation";
import CustomeCategory from "./FilterCategory";
import Spiner from "../../../assets/images/svg/spinner.svg";
import OnOff from "../OnOff/OnOff";
import useTheme from "../../../config/ThemeConfig/ThemeConfig";
const Sort: Array<{ value: string; label: string }> = [
  { value: "name", label: "نام" },
  { value: "cost", label: "قیمت" },
  { value: "students", label: "فروش" },
  { value: "date", label: "تاریخ" },
  { value: "capacity", label: "ظرفیت" },
];

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortArr: Array<{ value: string; label: string }> = [
  { value: "asc", label: "بالا به پایین" },
  { value: "dsc", label: "پایین به بالا" },
];
const SeacrArr: Array<{ value: string; label: string }> = [
  { value: "Course", label: "نام دوره" },
  { value: "Teacher", label: "نام معلم" },
];

const Filter: FC<Props> = ({ visible, setVisible }) => {
  const filteringStore = rootStore.filteringStore;
  const GetfilteringStore = rootStore.getFilteringData();

  useEffect(() => {
    if (!visible) {
      filteringStore.SetSubmit();
    }
  }, [visible]);
  const [CostLabel, SetCost] = useState([...GetfilteringStore.Cost]);
  const [CapacityLabel, SetCapacity] = useState([
    ...GetfilteringStore.Capacity,
  ]);
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <>
      <ModalWrapper
        style={{
          borderRadius: 30,
          backgroundColor: theme.drawer,
          width: "100%",
          paddingHorizontal: "10%",
          paddingVertical: "5.5%",
        }}
        setVisible={setVisible}
        visible={visible}
      >
        <>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <OnOff
              onPress={() => filteringStore.SetOnOff(!GetfilteringStore.isOn)}
              val={GetfilteringStore.isOn}
            />
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
              <Btn
                Tstyle={{ display: "none" }}
                Vstyle={{ marginLeft: 10 }}
                Press={() => {
                  filteringStore.SetClear();
                  SetCost([0, 500000]);
                  SetCapacity([0, 500]);
                }}
              >
                <Spiner fill={"#4F91FF"} width={20} />
              </Btn>
              <Btn
                Tstyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 50,
                  height: 20,
                  lineHeight: 50,
                  transform: [{ rotate: "45deg" }],
                  color: "#E44",
                }}
                Vstyle={{}}
                Press={() => setVisible(false)}
                title="+"
              />
            </View>
          </View>
          <CustomeCategory
            arr={Sort}
            title="مرتب سازی"
            check={GetfilteringStore.Sort}
            SetCheck={filteringStore.SetSort}
          />
          <View style={{ marginBottom: 8 }}>
            <CustomeText
              style={{
                fontSize: 15,
                color: "#707070",
                marginVertical: 10,
              }}
            >
              جستجو بر اساس :
            </CustomeText>
            <RadioButton
              array={SeacrArr}
              check={GetfilteringStore.SearchOption}
              SetCheck={filteringStore.SetSearchOp}
            />
          </View>
          <View>
            <CustomeText
              style={{
                fontSize: 15,
                color: "#707070",
                marginVertical: 10,
              }}
            >
              ترتیب :
            </CustomeText>
            <RadioButton
              array={SortArr}
              check={GetfilteringStore.SortDirection}
              SetCheck={filteringStore.SetSortDir}
            />
          </View>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#E3E6E8",
              marginVertical: 20,
            }}
          />
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <CustomeText
              style={{ fontSize: 15, color: theme.textColorDescription }}
              title="محدوده قیمت"
            />
            <View style={{ flexDirection: "row" }}>
              <CustomeText style={{ fontSize: 15, color: theme.topText }}>
                {CostLabel[0].toFixed()}
              </CustomeText>
              <CustomeText style={{ marginLeft: 10, color: theme.topText }}>
                {CostLabel[1].toFixed()}
              </CustomeText>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MultiSlider
              isMarkersSeparated={true}
              values={[
                parseInt(GetfilteringStore.Cost[0].toFixed()),
                parseInt(GetfilteringStore.Cost[1].toFixed()),
              ]}
              min={0}
              max={500000}
              sliderLength={220}
              onValuesChange={(val) => {
                SetCost([val[0], val[1]]);
              }}
              step={1000}
              onValuesChangeFinish={(val) => {
                filteringStore.SetCost([val[0], val[1]]);
              }}
              markerStyle={{ backgroundColor: theme.lightBackground }}
              selectedStyle={{ backgroundColor: theme.lightBackground }}
            />
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <CustomeText
              style={{ fontSize: 15, color: theme.textColorDescription }}
              title="محدوده ظرفیت"
            />
            <View style={{ flexDirection: "row" }}>
              <CustomeText style={{ color: theme.topText }}>
                {CapacityLabel[0].toFixed()}
              </CustomeText>
              <CustomeText style={{ marginLeft: 10, color: theme.topText }}>
                {CapacityLabel[1].toFixed()}
              </CustomeText>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MultiSlider
              isMarkersSeparated={true}
              values={[
                parseInt(GetfilteringStore.Capacity[0].toFixed()),
                parseInt(GetfilteringStore.Capacity[1].toFixed()),
              ]}
              min={0}
              max={500}
              onValuesChange={(val) => SetCapacity(val)}
              onValuesChangeFinish={(val) => {
                filteringStore.SetCapacity(val);
              }}
              sliderLength={220}
              markerStyle={{ backgroundColor: theme.lightBackground }}
              selectedStyle={{ backgroundColor: theme.lightBackground }}
            />
          </View>

          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#E3E6E8",
              marginVertical: 20,
            }}
          />

          <CustomeText
            style={{
              fontSize: 12,
              color: "rgb(120,120,120)",
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            *در هنگام تغییرات، فیلترینگ اعمال نمیشود*
          </CustomeText>
        </>
      </ModalWrapper>
    </>
  );
};

export default observer(Filter);

const styles = StyleSheet.create({});
