import { getStudent } from "~/backend/models/student-model";
import { UserInfo } from "~/types/userInfo";
import { jwtMiddleware } from "../_middlewares/jwtMiddleware";

export const GET = jwtMiddleware(async (userInfo: UserInfo) => {
  const { uid } = userInfo;
  const student = await getStudent(uid);
  console.log(student)
  return Response.json({
    student,
  });
});
