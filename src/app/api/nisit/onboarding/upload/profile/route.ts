import {
  deleteFile,
  uploadFile,
} from "~/app/api/hr/register/company/upload/minio";

export const PUT = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.getAll("file");

  const object = file[0] as File;

  const result = await uploadFile(object, "nisit/profile/");

  return Response.json(result);
};

export const DELETE = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;

  const objectName = searchParams.get("objectName");

  if (!objectName) {
    return Response.json(
      { message: "Object name is required" },
      { status: 400 },
    );
  }

  try {
    await deleteFile("nisit/profile/" + objectName);
    return Response.json({ message: "Deleted" });
  } catch (err) {
    return Response.json({ message: "Failed to delete" }, { status: 500 });
  }
};
