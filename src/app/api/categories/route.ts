import { getAllTags } from "~/backend/models/tag-model";

export const dynamic = "forcce-dynamic";

export const GET = async () => {
  const categories = await getAllTags();
  return Response.json({
    category: categories.map((item) => item.name),
  });
};
