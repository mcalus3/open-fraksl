import { useState } from "react";
import {
  useFractalReducer,
  usePixiApp,
} from "../StateManagement/FractalContextProvider";
import {
  getFractalDefinition,
  FractalState,
} from "../StateManagement/fractalReducer";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { v4 as uuidv4 } from "uuid";

const GET_PRESIGNED_UPLOAD_URL = gql`
  query presignedUploadUrl($savedFractalId: String!) {
    presignedUploadUrl(savedFractalId: $savedFractalId) {
      uploadUrl
      readUrl
      expiresAt
      savedFractalId
    }
  }
`;

const UPDATE_SAVED_FRACTAL = gql`
  mutation UpdateSavedFractal(
    $savedFractalId: String
    $savedName: String
    $fractalLoadData: String
    $createdBy: String
    $imageUrl: String
  ) {
    updateSavedFractal(
      savedFractalId: $savedFractalId
      savedName: $savedName
      fractalLoadData: $fractalLoadData
      createdBy: $createdBy
      imageUrl: $imageUrl
    ) {
      savedFractalId
      savedName
      fractalLoadData
      createdBy
      imageUrl
    }
  }
`;

export default function useSaveFractal(
  setError: (error: string) => void,
  onClose: () => void
) {
  const [savedFractalId] = useState(uuidv4());
  const { data: presignedUrlData, loading } = useQuery(
    GET_PRESIGNED_UPLOAD_URL,
    {
      variables: {
        savedFractalId: savedFractalId,
      },
    }
  );
  const [uploadFractal] = useMutation(UPDATE_SAVED_FRACTAL, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["savedFractals"],
  });
  const { state } = useFractalReducer();
  const { pixiApp } = usePixiApp();

  return async (values: any, { setSubmitting }: any) => {
    const savedFractalId = uuidv4();
    if (loading) {
      return;
    }

    pixiApp.renderer.plugins.extract
      .canvas(pixiApp.stage)
      .toBlob(async (blob) => {
        if (!blob) {
          setError("image upload failed");
          return;
        }
        const response = await fetch(
          new Request(presignedUrlData.presignedUploadUrl.uploadUrl, {
            method: "PUT",
            body: new File([blob], savedFractalId),
            headers: new Headers({
              "Content-Type": "image/*",
            }),
          })
        );

        if (response.status !== 200) {
          setSubmitting(false);
          setError("image upload failed");
          return;
        }
        const result = await uploadFractal({
          variables: {
            savedFractalId,
            savedName: values.name,
            createdBy: values.author,
            imageUrl: presignedUrlData.presignedUploadUrl.readUrl,
            fractalLoadData: JSON.stringify(getFractalLoadData(state)),
          },
        });
        if (result.data) {
        } else if (result.errors) {
          setError(
            result.errors.reduce((prev, curr) => prev + curr + "\n", "")
          );
        }
        setSubmitting(false);
        onClose();
      }, savedFractalId);
  };
}

function getFractalLoadData(state: FractalState) {
  const relevantParamNames = Object.keys(
    getFractalDefinition(state.name).parameters
  );
  const relevantParams = Object.fromEntries(
    Object.entries(state.parameters).filter((e) =>
      relevantParamNames.includes(e[0])
    )
  );
  return {
    color: state.color.name,
    parameters: relevantParams,
    name: state.name,
    texture: state.texture.name,
  };
}
