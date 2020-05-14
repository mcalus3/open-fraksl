import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Grid,
  Tooltip,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import useSaveFractal from "./useSaveFractal";
import { useFractalReducer } from "../StateManagement/FractalContextProvider";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SaveInAGalleryDialog({ open, onClose }: DialogProps) {
  const { state } = useFractalReducer();
  const [error, setError] = useState<string | null>(null);
  const saveFractal = useSaveFractal(setError, onClose);

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
        <Formik initialValues={{ name: "", author: "" }} onSubmit={saveFractal}>
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
                    <Button variant="outlined" onClick={onClose}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    {isSubmitting ? <CircularProgress size="2rem" /> : null}
                  </Grid>
                  <Grid item>
                    {state.texture.name === "custom" ? (
                      <Tooltip title="Upload of custom textures is not yet implemented">
                        <span>
                          <Button variant="contained" type="submit" disabled>
                            Submit
                          </Button>
                        </span>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={
                          isSubmitting || state.texture.name === "custom"
                        }
                      >
                        Submit
                      </Button>
                    )}
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
