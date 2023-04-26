import { observer } from "mobx-react";
import rootStore from "../../store/Store";
import AuthenticatedApp from "../AuthenticatedApp/AuthenticatedApp";
import UnAuthenticatedApp from "../UnAuthenticatedApp/UnAuthenticatedApp";

const Navigator = observer(({}) => {
  const GetRegisterStore = rootStore.getRegisterationData();
  return (
    <>
      {GetRegisterStore.Active ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </>
  );
});

export default Navigator;
