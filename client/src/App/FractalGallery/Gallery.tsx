import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Grid,
  Box,
  CircularProgress,
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export const Gallery = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(
    gql`
      query {
        savedFractals {
          savedFractalId
          createdAt
          createdBy
          savedName
          fractalLoadData
        }
      }
    `
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const dataComponent = loading ? (
    <CircularProgress />
  ) : error ? (
    <Typography>
      {error.name}: {error.message} (for more info see in console)
    </Typography>
  ) : (
    <Grid direction="column" container justify="center">
      <Grid container alignItems="center" justify="center">
        <Box p={2}>
          <Grid container wrap="wrap">
            {data.savedFractals.map((savedFractal: any) => (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="favicon/android-icon-192x192.png"
                    title="fractal image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {savedFractal.savedName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Author: {savedFractal.createdBy}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <Container>
      <Box p={2}>{dataComponent}</Box>
    </Container>
  );
};
