import * as Yup from "yup";

const ForgetPassShema = Yup.object().shape({
  password: Yup.string()
    .min(8, "رمز عبور کوتاه")
    .max(30, "رمز عبور طولانی")
    .required("فیلد را پر کنید")
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$",
      "* Example1@ *"
    ),
  confirmPassword: Yup.string()
    .required("فیلد  دوم را پر کنید")
    .oneOf([Yup.ref("password")], "* رمز ها مطابقت ندارد *"),
});
export { ForgetPassShema };
