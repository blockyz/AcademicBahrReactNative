import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل نادرست")
    .required("فیلد را پر کنید")
    .matches("^[a-z{2,8}A-Z{2,8}0-9{2,8}+_.-]+@[a-zA-Z0-9.-]+$", "ایمیل نادرست")
    .max(35, "ایمیل طولانیست"),
  username: Yup.string()
    .min(5, "نام کاربری کوتاه")
    .max(40, "نام کاربری بلند")
    .required("فیلد را پر کنید")
    .matches(
      /^([\u0600-\u06FF]+ ?)+[\u0600-\u06FF]$|([a-zA-Z]+ ?)+[a-zA-Z]$/,
      "نام نادرست"
    ),
  password: Yup.string()
    .min(8, "رمز عبور کوتاه")
    .max(25, "رمز عبور طولانی")
    .required("فیلد را پر کنید")
    .matches("^[A-Za-z0-9]{7,29}$", "حداقل سطح رمز عبور بسیار آسان"),
  iduser: Yup.string()
    .min(10, "کدملی نامعتبر")
    .max(10, "کدملی نامعتبر")
    .required("فیلد را پر کنید")
    .matches("^[0-9{0,10}]+$", "کدملی نادرست"),
  phone: Yup.string()
    .min(11, "شماره نامعتبر")
    .max(11, "شماره نامعتبر")
    .required("فیلد را پر کنید")
    .matches("^09[0|1|2|3][0-9]{8}$", "شماره نادرست"),
  dateage: Yup.string()
    .matches("^[0-9]{4}/[0-9]{2}/[0-9]{2}$", "تاریخ نادرست")
    .required("فیلد را پر کنید"),
});

export { SignupSchema };
