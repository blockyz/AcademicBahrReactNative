import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Heart from "../../../assets/images/svg/heart.svg";
import Heartfat from "../../../assets/images/svg/heartfat.svg";
import { observer } from "mobx-react";
import rootStore from "../../../store/Store";
import Toast from "react-native-toast-message";
import { LikeApi } from "../../../core/services/api/Like-api";
import CustomText from "../Text/CustomText";
import { DisLikeApi } from "../../../core/services/api/Dislike-api";
import Btn from "../Button/Btn";

interface Props {
  id: string;
  style?: StyleProp<ViewStyle>;
  it: Dataitems;
}
type Dataitems = {
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
  students: object[];
  capacity: number;
  _id: string;
};

const Like: FC<Props> = ({ id, style = {}, it }) => {
  const GetRegisterationStore = rootStore.getRegisterationData();
  const GetBasketStore = rootStore.getBasketData();
  const BasketStore = rootStore.basket;

  const IsItIn = () => {
    const bookmark = GetBasketStore.FaveList.findIndex((x) => x._id === id);
    return bookmark !== -1 ? false : true;
  };

  const [Loading, setIsLoading] = useState<boolean | null>(null);

  const handelLike = async () => {
    if (GetRegisterationStore.Active) {
      const res = await LikeApi({
        obj: {
          id: id,
          userid: GetRegisterationStore.user._id,
        },
        setIsLoad: setIsLoading,
      });
      if (res) {
        BasketStore.AddFave(it);
      }
    } else {
      Toast.show({ text1: "لطفا وارد شوید", type: "error" });
    }
  };
  const handelDisLike = async () => {
    const res = await DisLikeApi({
      obj: {
        id: id,
        userid: GetRegisterationStore.user._id,
      },
      setIsLoad: setIsLoading,
    });
    if (res) {
      BasketStore.RemoveFave(it._id);
    }
  };

  if (Loading) {
    return (
      <View style={style}>
        <CustomText style={{ color: "#aaa" }}>wait</CustomText>
      </View>
    );
  }
  return IsItIn() ? (
    <Btn Press={handelLike} Vstyle={style} Tstyle={{ display: "none" }}>
      <Heart fill={"#b0b0b0"} width={22} height={20} />
    </Btn>
  ) : (
    <Btn Press={handelDisLike} Vstyle={style} Tstyle={{ display: "none" }}>
      <Heartfat width={22} height={20} />
    </Btn>
  );
};

export default observer(Like);

const styles = StyleSheet.create({});
