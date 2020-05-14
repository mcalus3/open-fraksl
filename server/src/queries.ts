import { scanItems } from "simple-dynamodb";
import AWS from "aws-sdk";
import { addSeconds } from "date-fns";

type SortBy = "mostLikes" | "newest";

const convertNullToZero = (n: number | null | undefined) =>
  n === null || n === undefined ? 0 : n;

const sortFunctions: Record<SortBy, (a: any, b: any) => number> = {
  mostLikes: (a, b) =>
    convertNullToZero(b.numberOfLikes) - convertNullToZero(a.numberOfLikes),
  newest: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
};

export const getSavedFractals = async (
  _: any,
  { sortBy }: { sortBy: SortBy }
) => {
  const result = await scanItems({
    TableName: process.env.SAVED_FRACTALS_TABLE!,
  });

  return result.Items?.sort(sortFunctions[sortBy]);
};

const S3 = new AWS.S3({
  signatureVersion: "v4",
});
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export const presignedUploadUrl = async (
  _: any,
  { savedFractalId }: { savedFractalId: string }
) => {
  const filename = `${savedFractalId}`;
  const expireSeconds = 60 * 5;
  const readUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${filename}`;

  const uploadUrl = S3.getSignedUrl("putObject", {
    Bucket: process.env.S3_BUCKET,
    Key: filename,
    ContentType: "image/*",
    Expires: expireSeconds,
  });

  return {
    uploadUrl,
    readUrl,
    savedFractalId,
    expiresAt: addSeconds(new Date(), expireSeconds),
  };
};
