import React from "react";
import "../styles/App.css";
import ContentComponent from "./ContentComponent";
import CustomAppBar from "./HeaderComponent";
import Grid from "@material-ui/core/Grid";
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid container direction="column" spacing="7">
          <Grid item xs>
            <CustomAppBar />
          </Grid>
          <Grid item xs>
            <ContentComponent />
          </Grid>
        </Grid>
      </div>
    );
  }
}
