import * as Yup from "yup";

const EditSchema = Yup.object().shape({
  name: Yup.string()
    .required("فیلد را پر کنید")
    .max(40, "اسم طولانیست")
    .min(5, "نام کوتاه است")
    .matches(
      /^([\u0600-\u06FF]+ ?)+[\u0600-\u06FF]$|([a-zA-z]+ ?)+[a-zA-z]$/,
      "نام نادرست"
    ),
  // .matches(
  //   "^[a-z{2,8}A-Z{2,8}0-9{2,8}+_.-]+@[a-zA-Z0-9.-]+$",
  //   "ایمیل نادرست"
  // )
  // email: Yup.string()
  //   .email("ایمیل نادرست")
  //   .required("فیلد را پر کنید")
  //   .matches("^[a-z{2,8}A-Z{2,8}0-9{2,8}+_.-]+@[a-zA-Z0-9.-]+$", "ایمیل نادرست")
  //   .max(35, "ایمیل طولانیست"),
  Phone: Yup.string()
    .min(11, "شماره نامعتبر")
    .max(11, "شماره نامعتبر")
    .required("فیلد را پر کنید")
    .matches("^09[0|1|2|3][0-9]{8}$", "شماره نادرست"),
  date: Yup.string()
    .matches("^[0-9]{4}/[0-9]{2}/[0-9]{2}$", "تاریخ نادرست")
    .required("فیلد را پر کنید"),
  // iduser: Yup.string()
  //   .min(10, "کدملی نامعتبر")
  //   .max(10, "کدملی نامعتبر")
  //   .required("فیلد را پر کنید")
  //   .matches("^[0-9{0,10}]+$", "کدملی نادرست"),
});
export { EditSchema };
