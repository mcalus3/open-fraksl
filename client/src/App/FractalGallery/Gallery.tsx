import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import clsx from "clsx";
import { SavedFractalCard } from "./SavedFractalCard";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 5,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: 300,
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.contrastText, 0.04),
    },
  },
  activeLink: {
    backgroundColor: fade(theme.palette.secondary.contrastText, 0.04),
  },
}));

type SortBy = "mostLikes" | "newest";

export const Gallery = () => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState<SortBy>("mostLikes");
  const { data: fractalsData, loading, error } = useQuery(
    gql`
      query($sortBy: String!) {
        savedFractals(sortBy: $sortBy) {
          savedFractalId
          createdAt
          createdBy
          savedName
          fractalLoadData
          numberOfLikes
          imageUrl
        }
      }
    `,
    { variables: { sortBy } }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const dataComponent = loading ? (
    <Grid item>
      <CircularProgress />
    </Grid>
  ) : error ? (
    <Grid item>
      <Typography>
        {error.name}: {error.message} (for more info see in console)
      </Typography>
    </Grid>
  ) : (
    fractalsData.savedFractals.map((savedFractal: any) => (
      <Grid item key={savedFractal.savedFractalId}>
        <SavedFractalCard savedFractal={savedFractal} />
      </Grid>
    ))
  );

  return (
    <Container>
      <Box p={2}>
        <Box className={classes.toolbar}>
          <Grid container alignItems="center">
            <Grid item xs>
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
                    [classes.activeLink]: sortBy === "mostLikes",
                  })}
                  onClick={() => setSortBy("mostLikes")}
                >
                  most likes first
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={clsx(classes.button, {
                    [classes.activeLink]: sortBy === "newest",
                  })}
                  onClick={() => setSortBy("newest")}
                >
                  newest first
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container wrap="wrap" spacing={4} justify="center">
          {dataComponent}
        </Grid>
      </Box>
    </Container>
  );
};
