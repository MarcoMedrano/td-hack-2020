import React from "react";

import { createStyles, Theme } from "@material-ui/core/styles";

import PhoneIcon from "@material-ui/icons/PhoneEnabled";
import { Fab, makeStyles } from "@material-ui/core";
import { ShakeLittle } from "reshake";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default function CallMessage(props: any) {
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
      Answer incoming call?
      <ShakeLittle fixed={true} active={!props.disabled}>
        <PhoneIcon className={classes.extendedIcon} />
      </ShakeLittle>
    </Fab>
  );
}
