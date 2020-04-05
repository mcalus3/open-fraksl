import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Button
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

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

const useStyles = makeStyles(theme => ({
  root: {
    width: 170
  },
  media: {
    height: 170
  },
  toolbar: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 5,
    padding: theme.spacing(1)
  },
  button: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: 300,
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.contrastText, 0.04)
    }
  },
  activeLink: {
    backgroundColor: fade(theme.palette.secondary.contrastText, 0.04)
  }
}));

type SortBy = "mostLikes" | "newest";

export const Gallery = () => {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();
  const history = useHistory();
  const [sortBy, setSortBy] = useState<SortBy>("mostLikes");
  const { data: fractalsData, loading, error } = useQuery(
    gql`
      query {
        savedFractals {
          savedFractalId
          createdAt
          createdBy
          savedName
          fractalLoadData
          numberOfLikes
        }
      }
    `
  );

  const [likeSavedFractal] = useMutation(
    gql`
      mutation LikeSavedFractal($savedFractalId: String) {
        likeSavedFractal(savedFractalId: $savedFractalId) {
          success
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
    <Box p={2}>
      <Grid container wrap="wrap" spacing={4} justify="center">
        {fractalsData.savedFractals.map((savedFractal: any) => (
          <Grid item>
            <Card className={classes.root} key={savedFractal.savedFractalId}>
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
              <CardActions>
                <Grid container justify="space-between">
                  <Grid item>
                    <Tooltip title="share">
                      <IconButton size="small" aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="like">
                      <IconButton
                        size="small"
                        aria-label="like"
                        onClick={async () => {
                          try {
                            await likeSavedFractal({
                              variables: {
                                savedFractalId: savedFractal.savedFractalId
                              }
                            });
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                    {savedFractal.numberOfLikes || 0}{" "}
                    {savedFractal.numberOfLikes === 1 ? "like" : "likes"}
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container>
      <Box p={2}>
        <Box className={classes.toolbar}>
          <Grid container alignItems="center">
            <Grid item xs alignItems="center">
              <Typography variant="h5">Saved fractals gallery</Typography>
            </Grid>
            <Grid
              container
              item
              xs
              alignItems="center"
              spacing={1}
              justify="flex-end"
            >
              <Grid item>Sort by: </Grid>
              <Grid item>
                <Button
                  className={clsx(classes.button, {
                    [classes.activeLink]: sortBy === "mostLikes"
                  })}
                  onClick={() => setSortBy("mostLikes")}
                >
                  most likes first
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={clsx(classes.button, {
                    [classes.activeLink]: sortBy === "newest"
                  })}
                  onClick={() => setSortBy("newest")}
                >
                  newest first
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {dataComponent}
      </Box>
    </Container>
  );
};
