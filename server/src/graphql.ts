import { ApolloServer, gql } from "apollo-server-lambda";
import { updateUser } from "./mutations";
import { updateSavedFractal } from "./mutations/updateSavedFractal";
import { likeSavedFractal } from "./mutations/likeSavedFractal";
import { getSavedFractals } from "./queries";

const schema = gql`
  type MutationResult {
    success: Boolean
  }

  type User {
    userId: String
    createdAt: String
    lastSignedInAt: String
  }

  type SavedFractal {
    savedFractalId: String
    createdAt: String
    createdBy: String
    savedName: String
    fractalLoadData: String
    numberOfLikes: Int
  }

  type Query {
    savedFractals: [SavedFractal]
  }

  type Mutation {
    updateUser(userId: String): User
    updateSavedFractal(
      savedFractalId: String
      savedName: String
      fractalLoadData: String
      createdBy: String
    ): SavedFractal
    likeSavedFractal(savedFractalId: String): MutationResult
  }
`;

const resolvers = {
  Query: {
    savedFractals: getSavedFractals,
  },
  Mutation: {
    updateUser,
    updateSavedFractal,
    likeSavedFractal,
  },
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
