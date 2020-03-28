import React, { useEffect } from "react";
import {
  Container,
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
import { useHistory } from "react-router-dom";

import { useFractalReducer } from "../fractalGenerator/StateManagement/FractalContextProvider";
import { FractalLoadData } from "../fractalGenerator/ControlComponents/SaveInAGalleryButton";
import { colorPalettes } from "../fractalGenerator/FractalDefinitions/common/ColorPalettes";
import { fractalTextures } from "../fractalGenerator/FractalDefinitions/common/FractalTextures";

const createFractalData = (loadDataString: string) => {
  const loadData = JSON.parse(loadDataString);

  return {
    name: loadData.name,
    parameters: loadData.parameters,
    color: colorPalettes.find(c => c.name === loadData.color),
    texture: fractalTextures.find(t => t.name === loadData.texture)
  } as FractalLoadData;
};

const useStyles = makeStyles({
  root: {
    width: 170
  },
  media: {
    height: 170
  }
});

export const Gallery = () => {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();
  let history = useHistory();
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
          <Grid container wrap="wrap" spacing={4}>
            {data.savedFractals.map((savedFractal: any) => (
              <Grid item>
                <Card
                  className={classes.root}
                  key={savedFractal.savedFractalId}
                >
                  <CardActionArea
                    onClick={() => {
                      dispatch({
                        type: "SET_FRACTAL",
                        payload: {
                          data: createFractalData(savedFractal.fractalLoadData)
                        }
                      });
                      history.push("/");
                    }}
                  >
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
              </Grid>
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
