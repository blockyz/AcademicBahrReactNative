import { useWindowDimensions, View, Animated, BackHandler } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import Favorite from "../../component/content/Landing/favorite/Favorite";
import Courses from "../../component/content/Landing/Courses/Courses";
import Cart from "../../component/content/Landing/Cart/Cart";
import Heart from "../../assets/images/svg/Tab/8725991_heart_icon.svg";
import CartIcon from "../../assets/images/svg/Tab/8726292_shopping_basket_icon.svg";
import CoursesIcon from "../../assets/images/svg/Tab/8725956_file_alt_icon.svg";
import DrawerIcon from "../../assets/images/svg/Tab/8725699_dialpad_alt_icon.svg";
import Navbar from "../../component/common/navbar/Navbar";
import { Anim } from "../../component/common/Animation/Animation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { observer } from "mobx-react";
import rootStore from "../../store/Store";
import Setting from "../../component/content/panel/Setting";
import EditProfile from "../../component/content/panel/EditProfile";
import useTheme from "../../config/ThemeConfig/ThemeConfig";

type Props = {
  navigation?: any;
};
const Tab = createBottomTabNavigator();

const UnAuthenticatedTab: FC<Props> = ({ navigation }) => {
  const [click, setClick] = useState<boolean>(true);
  const { height, width } = useWindowDimensions();
  const navheight = (6 * height) / 100;
  const courseNavHeight = (15 * height) / 100;
  const HeightDecrese = useRef(new Animated.Value(courseNavHeight)).current;
  const PaddingDecrese = useRef(new Animated.Value(navheight)).current;
  const HeightGrow = useRef(new Animated.Value(navheight)).current;
  const PaddingGrow = useRef(new Animated.Value(0)).current;

  const route = useRoute();
  useEffect(() => {
    const p = route.params?.open;
    if (p) {
      navigation.getParent("wrap").openDrawer();
    }
  }, [route.name, route.params]);
  const GetSettingData = rootStore.getSettingData();
  const mythem = GetSettingData.themeColor as {
    mode: "dark" | "light";
    pallete: "blue" | "red" | "green";
  };
  const theme = useTheme(mythem);

  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          backgroundColor: theme.lightBackground,
          height: "7.5%",
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarShowLabel: false,
        headerShown: true,
        header: ({ route }) => (
          <Navbar
            navheight={navheight}
            courseNavHeight={courseNavHeight}
            route={route}
            click={click}
            HeightDecrese={HeightDecrese}
            PaddingDecrese={PaddingDecrese}
            HeightGrow={HeightGrow}
            PaddingGrow={PaddingGrow}
          />
        ),
      }}
      sceneContainerStyle={{
        backgroundColor: theme.TabBackgroundColor,
        paddingBottom: "17%",
      }}
      initialRouteName="Course"
    >
      <Tab.Screen
        name="Fave"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Heart style={{ opacity: focused ? 1 : 0.5 }} />;
          },
        }}
        listeners={{
          focus: () => {
            navigation.dispatch(
              DrawerActions.jumpTo("DetdrawerW", { Field: "Fave" })
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        listeners={{
          focus: () => {
            navigation.dispatch(
              DrawerActions.jumpTo("DetdrawerW", { Field: "Cart" })
            );
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <CartIcon fill={"#fff"} style={{ opacity: focused ? 1 : 0.5 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Course"
        component={Courses}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <CoursesIcon
                fill={"#fff"}
                style={{ opacity: focused ? 1 : 0.5 }}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            setClick(true);
            Anim(HeightDecrese, courseNavHeight, 0);
            Anim(PaddingDecrese, navheight, 0);
          },
          blur: () => {
            setClick(false);
            Anim(HeightDecrese, navheight, 500);
            Anim(PaddingDecrese, 0, 500);
          },
          focus: () => {
            setClick(true);
            Anim(HeightDecrese, courseNavHeight, 0);
            Anim(PaddingDecrese, navheight, 0);
            navigation.dispatch(
              DrawerActions.jumpTo("DetdrawerW", { Field: "Course" })
            );
          },
        }}
      />
      <Tab.Screen
        name="druwer"
        children={() => {
          return <View style={{}}></View>;
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent("wrap").openDrawer();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <DrawerIcon style={{ opacity: focused ? 1 : 0.5 }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default observer(UnAuthenticatedTab);
