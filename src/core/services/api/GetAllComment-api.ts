import Http from "../interceptor/interceptor";

const GetAllComment = async (): Promise<Array<object> | null> => {
  const res = await Http.get(`comments`);
  return res.data;
};

export { GetAllComment };
