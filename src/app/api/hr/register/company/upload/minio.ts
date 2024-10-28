import * as Minio from "minio";
import { env } from "~/configs/env";

const endPoint = new URL("http://" + env.MINIO_ENDPOINT).hostname;

export const client = new Minio.Client({
  endPoint,
  port: parseInt(env.MINIO_PORT),
  useSSL: env.MINIO_SSL === "true",
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
});

export const bucketName = "ku-job";

const createBucketIfNotExist = async () => {
  const exists = await client.bucketExists(bucketName);

  if (!exists) {
    await client.makeBucket(bucketName);
  }
};

export const uploadFile = async (file: File, objectDir: string = "public/") => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const objectName = Date.now() + "_" + file.name;
  const objectPath = objectDir + objectName;
  const fileType = file.type;

  await createBucketIfNotExist();

  const metaData = {
    "Content-Type": fileType,
  };

  await client.putObject(bucketName, objectPath, buffer, undefined, metaData);

  const protocol = env.MINIO_SSL === "true" ? "https://" : "http://";

  return {
    objectName,
    dest: `${protocol}${env.MINIO_ENDPOINT}/${bucketName}/${objectPath}`,
  };
};

export const deleteFile = async (objectName: string) => {
  await client.removeObject(bucketName, objectName);
};
