import React, { Component } from "react";
import Auxiliaire from "../../../HOC/Auxiliaire/Auxiliaire";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    return (
      <Auxiliaire>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliaire>
    );
  }
}

export default Modal;
