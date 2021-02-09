import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes Well !</h1>
      <div>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.navigateBackFromCheckoutPage}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.navigateToContactPage}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
