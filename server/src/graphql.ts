import { ApolloServer, gql } from "apollo-server-lambda";
import { updateUser } from "./mutations";
import { updateSavedFractal } from "./mutations/updateSavedFractal";
import { getSavedFractals } from "./queries";

const schema = gql`
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
  }
`;

const resolvers = {
  Query: {
    savedFractals: getSavedFractals
  },
  Mutation: {
    updateUser,
    updateSavedFractal
  }
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
