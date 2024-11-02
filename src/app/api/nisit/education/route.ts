import { UserInfo } from "~/types/userInfo";
import { jwtMiddleware } from "../../_middlewares/jwtMiddleware";
import { getStudent } from "~/backend/models/student-model";

export const GET = jwtMiddleware(async (info: UserInfo) => {
  const { uid } = info;
  const student = await getStudent(uid);
  return Response.json({
    workInfo: {
      faculty: student.faculty,
      major: student.major,
      description: student.description,
      gpax: student.gpax,
    },
  });
});
