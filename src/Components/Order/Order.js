import React from "react";

import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.ingredientName}
        style={{
          display: "inline-block",
          textTransform: "capitalize",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.ingredientName} : {ig.amount}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients :</p>
      {ingredientOutput}
      <p>
        Total Price{" "}
        <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
