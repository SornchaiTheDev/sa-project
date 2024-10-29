import { getAllJobAnnouncements } from "~/backend/models/jobAnnouncement-model";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const province = searchParams.get("province") ?? "";
  const amphur = searchParams.get("amphur") ?? "";
  const tambon = searchParams.get("tambon") ?? "";
  const position = searchParams.get("position") ?? "";
  const category = searchParams.get("category") ?? "";
  const jobType = searchParams.get("jobType") ?? "";

  const parsedPoisition = position.split(",").filter((p) => p !== "");

  const replaceAllString = (str: string) => (str === "all" ? "" : str);
  const replaceAllNumber = (str: string) =>
    str === "all" ? -1 : parseInt(str);

  const announcements = await getAllJobAnnouncements({
    positions: parsedPoisition,
    province: replaceAllString(province),
    amphur: replaceAllString(amphur),
    tambon: replaceAllString(tambon),
    category: replaceAllString(category),
    jobType: replaceAllNumber(jobType),
  });

  return Response.json({
    announcements,
  });
};
