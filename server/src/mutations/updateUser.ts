import { getItem, updateItem } from "simple-dynamodb";
import { User } from "../types";

type UserParams = {
  userId: string;
};

type updateUser = (_: any, params: UserParams) => Promise<User>;

export const updateUser: updateUser = async (_, { userId }) => {
  // see if user exists
  // if not: update createdAt
  // always update lastSignedInAt

  const result = await getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      userId
    }
  });

  let user = result.Item;

  if (user) {
    // update the user
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: { userId },
      UpdateExpression: "SET lastSignedInAt = :lastSignedInAt",
      ExpressionAttributeValues: {
        ":lastSignedInAt": new Date().toISOString()
      }
    });

    user = result.Attributes;
  } else {
    // create new user
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: { userId },
      UpdateExpression:
        "SET createdAt = :createdAt, lastSignedInAt = :lastSignedInAt",
      ExpressionAttributeValues: {
        ":createdAt": new Date().toISOString(),
        ":lastSignedInAt": new Date().toISOString()
      }
    });

    user = result.Attributes;
  }

  return {
    userId,
    createdAt: user ? user.createdAt : null,
    lastSignedInAt: user ? user.lastSignedInAt : null
  };
};
