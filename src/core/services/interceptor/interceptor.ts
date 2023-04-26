import axios from "axios";
import { REACT_APP_PUBLIC_PATH } from "@env";
import rootStore from "../../../store/Store";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // check if error is expected from backend
    try {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      // if error doesnt expected when we log it
      if (!expectedError) {
        // tweak it later
        // get error message from backend (see object of response later... maybe its changed)
        try {
          console.log(error.response.data.message[0].message);
        } catch (error) {}
      }
    } catch (error) {}
    return Promise.reject(error);
  }
);

// will send token to headers request ( in x-auth-token body )
axios.interceptors.request.use((config) => {
  config.headers["x-auth-token"] = rootStore.getRegisterationData().token;
  return config;
});
const MainUrl = REACT_APP_PUBLIC_PATH;
axios.defaults.baseURL = MainUrl;

export default axios;
