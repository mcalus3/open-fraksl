import { getItem, updateItem } from "simple-dynamodb";
import { MutationResult } from "../types";

type LikeSavedFractalParams = {
  savedFractalId: string;
};

type UpdateSavedFractal = (
  _: any,
  params: LikeSavedFractalParams
) => Promise<MutationResult>;

export const likeSavedFractal: UpdateSavedFractal = async (
  _,
  { savedFractalId }
) => {
  await updateItem({
    TableName: process.env.SAVED_FRACTALS_TABLE!,
    Key: { savedFractalId },
    UpdateExpression: "ADD numberOfLikes :inc",
    ExpressionAttributeValues: {
      ":inc": 1,
    },
  });
  return { success: true };
};
