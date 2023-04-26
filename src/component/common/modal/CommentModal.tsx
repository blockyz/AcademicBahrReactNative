import { View, KeyboardAvoidingView } from "react-native";
import React, { FC, useState } from "react";
import CustomeText from "../Text/CustomText";
import ModalWrapper from "./ModalWrapper";
import ImageLoader from "../imageloader/LaziImageLoader";
import MyInput from "./../Field/Field";
import Btn from "../Button/Btn";
import { observer } from "mobx-react";
import rootStore from "../../../store/Store";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const CommentModal: FC<Props> = ({ visible, setVisible, id }) => {
  const GetUserStore = rootStore.getRegisterationData();
  const [text, SetText] = useState<string>("");
  return (
    <>
      <ModalWrapper
        visible={visible}
        setVisible={setVisible}
        animIn={"slideInUp"}
        animOut={"slideOutDown"}
      >
        <View
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageLoader
              style={{ height: 100, width: 100, borderRadius: 50 }}
              src={GetUserStore.user.profile}
            />
            <CustomeText style={{ color: "#002D85", fontSize: 25 }}>
              {GetUserStore.user.fullName}
            </CustomeText>
          </View>
          <View>
            <MyInput
              multiline={true}
              style={{
                borderColor: "#E3E6E8",
                borderWidth: 1,
                backgroundColor: "#FCFCFC",
                borderRadius: 25,
                height: 230,
              }}
              KeboradShow={true}
              placeholder="متن نظر"
              value={text}
              onChangeText={(v) => SetText(v)}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Btn
              Press={() => setVisible(false)}
              Vstyle={{
                borderWidth: 1,
                borderColor: "#FF0000",
                backgroundColor: "white",
                width: 130,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderRadius: 50,
              }}
              title="بازگشت"
              Tstyle={{ fontSize: 15, color: "#FF0000" }}
            />
            <Btn
              Vstyle={{
                backgroundColor: "#04A641",
                width: 130,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderRadius: 50,
              }}
              title="ثبت نظر"
              Tstyle={{ fontSize: 15, color: "#fff" }}
            />
          </View>
        </View>
      </ModalWrapper>
    </>
  );
};

export default observer(CommentModal);
