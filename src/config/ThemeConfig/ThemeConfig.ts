import { useColorScheme } from "react-native";
import { Theme } from "../../Types/Types";

type Props = Theme;

const blue = {
  lightBackground: "#4F91FF",
  darkBackground: "#3A84FF",
  greenButton: "#56AB16",
  redButton: "#FF0000",
  textBlue: "#818181",
  textGray: "#B2B2B2",
  textWhite: "#fff",
  darkPallete: "#0043F7",
  polygen: "#E2F1FF",
};
const red = {
  lightBackground: "#FF3E3E",
  darkBackground: "#FF3E3E",
  greenButton: "#56AB16",
  redButton: "#FF0000",
  textBlue: "#818181",
  textGray: "#B2B2B2",
  textWhite: "#fff",
  polygen: "#F88383",
  darkPallete: "#0043F7",
};
const green = {
  lightBackground: "#00C06D",
  darkBackground: "#00C06D",
  greenButton: "#56AB16",
  redButton: "#FF0000",
  textBlue: "#818181",
  textGray: "#B2B2B2",
  textWhite: "#fff",
  polygen: "#76BE9F",
  darkPallete: "#0043F7",
};
const dark = {
  textColor: "#fdfdfd",
  textColorDescription: "#ededed",
  backMode1: "#212477",
  backMode2: "#00216C",
  backModeLock: "#00216C",
  topText: "#fdfdfd",
  drawer: "#071941",
  drawerOverlay: "rgba(7,7,7,.55)",
  drawerButtenLogin: "#373A9F",
  TabBackgroundColor: "#00216C",
  CourseItem: "#4172E1",
  darkBackground: "#31359F",
  polygen: "#3369E2",
  textcolorlogo: "#fdfdfd",
  textcolorActive: "#fdfdfd",
  darkbackground2: "#31359F",
  textcolorDescription2: "#ccc",
  textcolorDescription3: "#ccc",
  textcolorDescription4: "#ccc",
};
const light = {
  textColor: "#818181",
  textColorDescription: "#696969",
  backMode1: "#fff",
  backMode2: "#F9FDFF",
  backModeLock: "#f2f2f2",
  topText: "#575757",
  drawer: "#fdfdfd",
  drawerOverlay: "rgba(0,57,152,.55)",
  drawerButtenLogin: "#eaeaea",
  TabBackgroundColor: "#eee",
  CourseItem: "#fff",
  textcolorlogo: "#00469A",
  textcolorActive: "#002D85",
  darkbackground2: "#fff",
  textcolorDescription2: "#777777",
  textcolorDescription3: "#8F8F8F",
  textcolorDescription4: "#3D5FA2",
};

const useTheme = (themeType: Props = { mode: "light", pallete: "blue" }) => {
  if (themeType.mode === "light") {
    switch (themeType.pallete) {
      case "blue":
        return { ...blue, ...light };
      case "red":
        return { ...red, ...light };
      case "green":
        return { ...green, ...light };
    }
  } else {
    switch (themeType.pallete) {
      case "blue":
        return { ...blue, ...dark };
      case "red":
        return { ...red, ...dark };
      case "green":
        return { ...green, ...dark };
    }
  }
};
export default useTheme;
