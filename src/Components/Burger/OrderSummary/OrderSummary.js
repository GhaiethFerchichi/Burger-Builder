import React, { Component } from "react";
import Auxiliaire from "../../../HOC/Auxiliaire/Auxiliaire";
import Button from "../../UI/Button/Button";

class orderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map((el) => (
      <li key={el + this.props.ingredients[el]}>
        <span style={{ textTransform: "capitalize" }}>{el}</span> :{" "}
        {this.props.ingredients[el]}
      </li>
    ));
    return (
      <Auxiliaire>
        <h3>Your Order</h3>
        <p>a delecious Burger with the following ingredients :</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price : {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          CANCEL
        </Button>
        {/* <Button btnType="Success" clicked={this.props.purchaeContinueHandler}> */}
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          CONTINUE
        </Button>
      </Auxiliaire>
    );
  }
}

export default orderSummary;
