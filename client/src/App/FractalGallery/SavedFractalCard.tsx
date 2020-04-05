import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { useMutation } from "@apollo/react-hooks";
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

type Props = {
  savedFractal: {
    savedFractalId: string;
    createdAt: string;
    createdBy: string;
    savedName: string;
    fractalLoadData: string;
    numberOfLikes: number;
  };
};

export const SavedFractalCard: React.FC<Props> = ({ savedFractal }) => {
  const classes = useStyles();
  const { dispatch } = useFractalReducer();
  const history = useHistory();
  const [likes, setLikes] = useState(savedFractal.numberOfLikes);

  const [likeSavedFractal, { loading, error }] = useMutation(
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

  return (
    <Card className={classes.root}>
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
          <Typography variant="body2" color="textSecondary" component="p">
            Author: {savedFractal.createdBy}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-between">
          <Grid item>
            <IconButton size="small" aria-label="share" disabled>
              <ShareIcon />
            </IconButton>
          </Grid>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Tooltip title="like">
                <IconButton
                  size="small"
                  aria-label="like"
                  onClick={async () => {
                    try {
                      const result = await likeSavedFractal({
                        variables: {
                          savedFractalId: savedFractal.savedFractalId
                        }
                      });
                      if (result.data.likeSavedFractal.success) {
                        setLikes(likes + 1);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            )}
            {error
              ? error.name
              : (likes || 0) + " " + (likes === 1 ? "like" : "likes")}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
