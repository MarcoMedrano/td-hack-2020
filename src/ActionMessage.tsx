import React from "react";

import { createStyles, Theme } from "@material-ui/core/styles";

import { Fab, makeStyles } from "@material-ui/core";
import { ShakeLittle } from "reshake";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
  })
);

export default function ActionMessage(props: any) {
  const classes = useStyles();

  return (
    <Fab
      variant="extended"
      color="primary"
      aria-label="add"
      className={classes.margin}
      disabled= {props.disabled}
      onClick={props.onClick}
    >
      {props.message}
      <ShakeLittle fixed={true} active={!props.disabled} style={{lineHeight: 'normal'}}>
        {props.icon}
      </ShakeLittle>
    </Fab>
  );
}
