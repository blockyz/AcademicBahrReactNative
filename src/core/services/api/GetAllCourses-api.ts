import Http from "../interceptor/interceptor";
// main url of backend
// const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllCourses = async (): Promise<object | null> => {
  const res = await Http.get(`course/getall`);
  return res.data.result;
};

export { GetAllCourses };
