import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  Typography,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SaveInAGalleryDialog({ open, onClose }: DialogProps) {
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
      <DialogContent dividers>...</DialogContent>
    </Dialog>
  );
}

// onClick={() => {
//     const relevantParamNames = Object.keys(
//       getFractalDefinition(state.name).parameters
//     );
//     const relevantParams = Object.fromEntries(
//       Object.entries(state.parameters).filter(e =>
//         relevantParamNames.includes(e[0])
//       )
//     );
//     uploadFractal({
//       color: state.color,
//       parameters: relevantParams,
//       name: state.name,
//       texture: state.texture
//     });
//   }}
