import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { ColorDefinition } from "../FractalDefinitions/common/ColorPalettes";
import { FractalTexture } from "../FractalDefinitions/common/FractalTextures";
import SaveInAGalleryDialog from "./SaveInAGalleryDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "flex",
      marginBottom: theme.spacing(3),
      textTransform: "none",
      lineHeight: 1,
      fontSize: "1rem"
    },
    icon: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1)
    }
  })
);

export type FractalLoadData = {
  color: ColorDefinition;
  parameters: Record<string, number>;
  name: string;
  texture: FractalTexture;
};

export default function SaveInAGalleryButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Save fractal to gallery
        <SaveIcon className={classes.icon} />
      </Button>
      <SaveInAGalleryDialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}
