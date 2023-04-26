import { StyleSheet, Text, View } from "react-native";
import React, { FC, useState, useEffect } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

type Props = {
  val: string;
  SetVal: React.Dispatch<React.SetStateAction<string>>;
};

const Datepicker: FC<Props> = ({ val, SetVal }) => {
  return (
    <DatePicker
      isGregorian={false}
      options={{
        defaultFont: "Yekanbakh",
        headerFont: "Yekanbakh",
      }}
      mode="calendar"
      selected={val}
      maximumDate={getFormatedDate(new Date(), "jYYYY/jMM/jDD")}
      onSelectedChange={(value) => {
        SetVal(value);
      }}
      current={val}
    />
  );
};

export default Datepicker;

const styles = StyleSheet.create({});
