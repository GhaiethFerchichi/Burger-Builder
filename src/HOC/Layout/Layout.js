import React, { Component } from "react";
import Auxiliaire from "../Auxiliaire/Auxiliaire";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.css";

class Layout extends Component {
  state = { showSideDrawer: false };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((previousState) => {
      return { showSideDrawer: !previousState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxiliaire>
        <SideDrawer
          open={this.state.showSideDrawer}
          sideDrawerCloseHandler={this.sideDrawerCloseHandler}
        />
        <Toolbar sideDrawerToggleHandler={this.sideDrawerToggleHandler} />
        <main className={classes.content}>{this.props.children}</main>
      </Auxiliaire>
    );
  }
}
export default Layout;
