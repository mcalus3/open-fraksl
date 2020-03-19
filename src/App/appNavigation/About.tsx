import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogActions,
  Button,
  Slide,
  Typography,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import { TransitionProps } from "react-transition-group/Transition";

const packageJson = require("../../../package.json");
const name = packageJson.name;
const version = packageJson.version;

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export interface AboutProps {
  open: boolean;
  onClose: () => void;
}

export default function About({ open, onClose }: AboutProps) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      aria-labelledby="about-title"
      aria-describedby="about-description"
      //@ts-ignore
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="about-title">
        {name} v{version}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          open-fraksl is a tool for you to create beautiful, yet simple
          generative art. Its aim is to allow user to explore unlimited
          possibilities of shaping his own fractals. I decided to make this app
          after many hours of playing with a mobile app, called Fraksl. I was
          wondering - would I be able to write down a procedure that would
          generate such a fractal?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
