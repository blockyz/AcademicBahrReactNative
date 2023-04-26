import { View } from "react-native";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { GetAllComment } from "../../../../core/services/api/GetAllComment-api";
import CustomText from "../../../common/Text/CustomText";
import rootStore from "../../../../store/Store";
import { observer } from "mobx-react";
import Layout from "../Layout";
import Btn from "../../../common/Button/Btn";
import { useNavigation } from "@react-navigation/native";

type Props = {};
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
const Cart: FC<Props> = observer(() => {
  const {
    data,
    isError,
    isLoading,
    refetch,
    isFetching,
    isRefetchError,
    isRefetching,
  } = useQuery({
    queryKey: "Comment",
    queryFn: GetAllComment,
  });

  const GetBasketStore = rootStore.getBasketData();
  const GetRegisterationStore = rootStore.getRegisterationData();
  const nav = useNavigation();
  return (
    <>
      {GetRegisterationStore.Active ? (
        <Layout
          Cdata={data}
          extraData={GetBasketStore.ShopingList.length}
          ErrCondition={isError && isFetching}
          RefetchingErrorCondition={isRefetchError || isRefetching}
          condition={isLoading || isFetching || isRefetching || isError}
          data={GetBasketStore.ShopingList}
          refetch={refetch}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomText
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "rgb(100,100,100)",
            }}
          >
            لطفا وارد شوید
          </CustomText>
          <Btn
            Vstyle={{
              height: 30,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              borderRadius: 20,
              marginTop: 15,
            }}
            title="ورود"
            Press={() => {
              nav.navigate("LogIn");
            }}
          />
        </View>
      )}
    </>
  );
});

export default Cart;
