import { getItem, updateItem } from "simple-dynamodb";
import { SavedFractal } from "../types";

type SavedFractalParams = {
  savedFractalId: string;
  savedName: string;
  fractalLoadData: string;
  createdBy: string;
  imageUrl: string;
};

type UpdateSavedFractal = (
  _: any,
  params: SavedFractalParams
) => Promise<SavedFractal>;

export const updateSavedFractal: UpdateSavedFractal = async (
  _,
  { savedFractalId, savedName, fractalLoadData, createdBy, imageUrl }
) => {
  // see if user exists
  // if not: update createdAt
  // always update lastSignedInAt

  const result = await getItem({
    TableName: process.env.SAVED_FRACTALS_TABLE!,
    Key: {
      savedFractalId,
    },
  });

  let savedFractal = result.Item;

  if (savedFractal) {
    // update the saved fractal
    const result = await updateItem({
      TableName: process.env.SAVED_FRACTALS_TABLE!,
      Key: { savedFractalId },
      UpdateExpression:
        "SET savedName = :savedName, fractalLoadData = :fractalLoadData, imageUrl = :imageUrl",
      ExpressionAttributeValues: {
        ":savedName": savedName,
        ":fractalLoadData": fractalLoadData,
        ":imageUrl": imageUrl,
      },
    });

    savedFractal = result.Attributes;
  } else {
    // create new saved fractal
    const result = await updateItem({
      TableName: process.env.SAVED_FRACTALS_TABLE!,
      Key: { savedFractalId },
      UpdateExpression:
        "SET createdAt = :createdAt, savedName = :savedName, fractalLoadData = :fractalLoadData, createdBy = :createdBy, imageUrl = :imageUrl",
      ExpressionAttributeValues: {
        ":createdAt": new Date().toISOString(),
        ":savedName": savedName,
        ":fractalLoadData": fractalLoadData,
        ":createdBy": createdBy,
        ":imageUrl": imageUrl,
      },
    });

    savedFractal = result.Attributes;
  }

  return {
    savedFractalId,
    createdAt: savedFractal ? savedFractal.createdAt : null,
    createdBy: savedFractal ? savedFractal.createdBy : null,
    savedName: savedFractal ? savedFractal.savedName : null,
    fractalLoadData: savedFractal ? savedFractal.fractalLoadData : null,
    numberOfLikes: savedFractal ? savedFractal.numberOfLikes : null,
  };
};
