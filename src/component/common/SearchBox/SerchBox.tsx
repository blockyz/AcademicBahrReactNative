import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { FC } from "react";

type Props = {};

const SerchBox: FC<Props> = ({}) => {
  return (
    <KeyboardAvoidingView>
      <TextInput />
    </KeyboardAvoidingView>
  );
};

export default SerchBox;

const styles = StyleSheet.create({});
