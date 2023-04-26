import React, { FC } from "react";
import { observer } from "mobx-react";
import rootStore from "../../store/Store";
import AuthenticatedTab from "../AuthenticatedApp/AuthenticatedTab";
import UnAuthenticatedTab from "../UnAuthenticatedApp/UnAuthenticatedTab";

type Props = {};

const TabNavigator: FC<Props> = ({ navigation }: any) => {
  const GetRegisterStore = rootStore.getRegisterationData();
  return GetRegisterStore.Active ? (
    <AuthenticatedTab navigation={navigation} />
  ) : (
    <UnAuthenticatedTab navigation={navigation} />
  );
};

export default observer(TabNavigator);
