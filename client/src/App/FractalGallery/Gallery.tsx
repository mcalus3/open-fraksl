import React from "react";
import { Container, Paper, Grid, Box } from "@material-ui/core";

export const Gallery = () => {
  return (
    <Container>
      <Box p={2}>
        <Paper>
          <Grid direction="column" container justify="center">
            <Grid container alignItems="center" justify="center">
              <Box p={2}>Coming soon...</Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};
