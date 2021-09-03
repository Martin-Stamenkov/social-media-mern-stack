import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20%",
  },
});

interface ISpinner {
  size?: number,
  className?: string
}

export function Spinner({ size = 50, className }: ISpinner) {
  const classes = useStyles();
  return (
    <Grid className={className ? className : classes.spinnerContainer}>
      <CircularProgress color="primary" size={size} />
    </Grid>
  );
}
