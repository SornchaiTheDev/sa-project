import { getAllTags } from "~/backend/models/tag-model";

export const GET = async () => {
  const categories = await getAllTags();
  return Response.json({
    category: categories.map((item) => item.name),
  });
};
