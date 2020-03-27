import { scanItems } from "simple-dynamodb";

export const getSavedFractals = async () => {
  // TODO: add pagination because this table can get large
  const result = await scanItems({
    TableName: process.env.SAVED_FRACTALS_TABLE!
  });

  return result.Items;
};
