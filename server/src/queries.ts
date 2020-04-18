import { scanItems } from "simple-dynamodb";

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
