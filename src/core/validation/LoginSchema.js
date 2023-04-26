import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل نادرست")
    .required("فیلد را پر کنید")
    .matches("^[a-z{2,8}A-Z{2,8}0-9{2,8}+_.-]+@[a-zA-Z0-9.-]+$", "ایمیل نادرست")
    .max(35, "ایمیل طولانیست"),
  password: Yup.string()
    .min(8, "رمز عبور کوتاه")
    .max(25, "رمز عبور طولانی")
    .required("فیلد را پر کنید")
    .matches("^[A-Za-z0-9]{7,29}$", "رمز عبور نامعتبر"),
});

export default LoginSchema;
