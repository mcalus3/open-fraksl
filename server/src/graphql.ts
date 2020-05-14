import { ApolloServer, gql } from "apollo-server-lambda";
import { updateUser } from "./mutations";
import { updateSavedFractal } from "./mutations/updateSavedFractal";
import { likeSavedFractal } from "./mutations/likeSavedFractal";
import { getSavedFractals, presignedUploadUrl } from "./queries";

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
    imageUrl: String
  }

  type Query {
    savedFractals(sortBy: String): [SavedFractal]
    presignedUploadUrl(savedFractalId: String!): PresignedUrl
  }

  type Mutation {
    updateUser(userId: String): User
    updateSavedFractal(
      savedFractalId: String
      savedName: String
      fractalLoadData: String
      createdBy: String
      imageUrl: String
    ): SavedFractal
    likeSavedFractal(savedFractalId: String): MutationResult
  }

  type PresignedUrl {
    uploadUrl: String
    readUrl: String
    savedFractalId: String
    expiresAt: String
  }
`;

const resolvers = {
  Query: {
    savedFractals: getSavedFractals,
    presignedUploadUrl,
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
