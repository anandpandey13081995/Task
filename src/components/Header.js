import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// import Login from "./Login";
// import DashBoard from "./DashBoard";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome to DashBoard
          </Typography>
          <Button color="inherit">
            {/* <Link to={Login}>Login</Link> */}Login
          </Button>
          <Button color="inherit">
            {/* <Link to={DashBoard}>DashBoard</Link> */}DashBoard
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
