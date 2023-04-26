import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import CustomText from "../../../common/Text/CustomText";
import Lock from "../../../../assets/images/svg/gholf.svg";
import useTheme from "../../../../config/ThemeConfig/ThemeConfig";
import rootStore from "../../../../store/Store";
import { observer } from "mobx-react";
import { Theme } from "../../../../Types/Types";
type Props = {
  title: string;
  children: JSX.Element;
  Buttun?: JSX.Element;
};

const Layout: FC<Props> = ({ title, children, Buttun }) => {
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as Theme;
  const theme = useTheme(mythem);
  return (
    <View style={{ ...styles.container, backgroundColor: theme.backModeLock }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Lock style={styles.lockIcon} width={100} height={100} />
        <CustomText style={{ ...styles.message, color: theme.textColor }}>
          {title}
        </CustomText>
        <View style={styles.inputFieldsContainer}>{children}</View>
        {Buttun}
      </View>
    </View>
  );
};

export default observer(Layout);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  lockIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputFieldsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputField: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    textAlign: "center",
    marginRight: 10,
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 4,
  },
  unlockButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
  },
  unlockButtonText: {
    color: "black",
  },
  kebord: {
    height: 50,
    backgroundColor: "#eaeaea",
    margin: 5,
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: "center",
  },
});
