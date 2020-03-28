import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Grid
} from "@material-ui/core";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";
import { getFractalDefinition } from "../StateManagement/fractalReducer";
import { FractalLoadData } from "./SaveInAGalleryButton";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { v4 as uuidv4 } from "uuid";

const UPDATE_SAVED_FRACTAL = gql`
  mutation UpdateSavedFractal(
    $savedFractalId: String
    $savedName: String
    $fractalLoadData: String
    $createdBy: String
  ) {
    updateSavedFractal(
      savedFractalId: $savedFractalId
      savedName: $savedName
      fractalLoadData: $fractalLoadData
      createdBy: $createdBy
    ) {
      savedFractalId
      savedName
      fractalLoadData
      createdBy
    }
  }
`;

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SaveInAGalleryDialog({ open, onClose }: DialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [uploadFractal, { data }] = useMutation(UPDATE_SAVED_FRACTAL, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["savedFractals"]
  });
  const { state } = useFractalReducer();

  const getFractalLoadData = () => {
    const relevantParamNames = Object.keys(
      getFractalDefinition(state.name).parameters
    );
    const relevantParams = Object.fromEntries(
      Object.entries(state.parameters).filter(e =>
        relevantParamNames.includes(e[0])
      )
    );
    return {
      color: state.color.name,
      parameters: relevantParams,
      name: state.name,
      texture: state.texture.name
    };
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      aria-labelledby="save-in-a-gallery-title"
      aria-describedby="save-in-a-gallery-description"
      keepMounted
    >
      <DialogTitle id="save-in-a-gallery-title">
        Save generated fractal in a gallery
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{ name: "", author: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await uploadFractal({
              variables: {
                savedFractalId: uuidv4(),
                savedName: values.name,
                createdBy: values.author,
                fractalLoadData: JSON.stringify(getFractalLoadData())
              }
            });
            console.log(result);
            if (result.data) {
            } else if (result.errors) {
              setError(
                result.errors.reduce((prev, curr) => prev + curr + "\n", "")
              );
            }
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Field name="name" component={TextField} label="name" />
                </Grid>
                <Grid item>
                  <Field name="author" component={TextField} label="author" />
                </Grid>
                <Grid item container justify="flex-end" spacing={1}>
                  <Grid item>
                    {isSubmitting ? <CircularProgress size="2rem" /> : null}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item>{error}</Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
