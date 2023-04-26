import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import ModalWrapper from "./ModalWrapper";
import CustomText from "../Text/CustomText";
import Datepicker from "../Datepicker/Datepicker";

type Props = {
  vis: boolean;
  SetVis: React.Dispatch<React.SetStateAction<boolean>>;
  val: string;
  SetVal: React.Dispatch<React.SetStateAction<string>>;
};

const DatepickerWrapper: FC<Props> = ({ vis, SetVis, val, SetVal }) => {
  return (
    <ModalWrapper
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 30,
        overflow: "hidden",
        alignItems: "center",
      }}
      animIn={"swing"}
      animOut={"fadeOutUp"}
      visible={vis}
      setVisible={SetVis}
    >
      <>
        <Datepicker SetVal={SetVal} val={val} />
      </>
    </ModalWrapper>
  );
};

export default DatepickerWrapper;

const styles = StyleSheet.create({});
