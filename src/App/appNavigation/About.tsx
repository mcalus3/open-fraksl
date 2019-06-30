import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

export interface AboutProps {
  open: boolean;
  onClose: () => void;
}

export default function About(props: AboutProps) {
  const { onClose, ...other } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="about" {...other}>
      <DialogTitle id="about">About open-fraksl</DialogTitle>
      <DialogContent>
        <DialogContentText id="about-description">
          open-fraksl is a tool for you to create beautiful, yet simple
          generative art. Its aim is to allow user to explore unlimited
          possibilities of shaping his own fractals. I decided to make this app
          after many hours of playing with a mobile app, called Fraksl. I was
          wondering - would I be able to write down a procedure that would
          generate such a fractal?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
