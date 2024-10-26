import axios from "axios";

export const getCategoryFn = async () => {
  const res = await axios.get<{ category: string[] }>("/api/categories");
  return res.data.category;
};
