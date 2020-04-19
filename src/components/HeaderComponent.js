import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

export default function CustomAppBar() {
  //   const classes = useStyles();

  return (
    <div>
      <AppBar>
        <Toolbar align="center">
          <Typography
            variant="h3"
            align="center"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Tax Calculator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
