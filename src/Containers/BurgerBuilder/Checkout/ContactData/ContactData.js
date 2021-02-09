import React, { Component } from "react";
import Button from "../../../../Components/UI/Button/Button";
import Spinner from "../../../../Components/UI/Spinner/Spinner";
import axios from "../../../../axios-orders";

import classes from "./ContactData.module.css";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    adress: {
      street: "",
      postCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const dataToPost = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice.toFixed(2),
      customer: {
        name: "Ghaieth Ferchichi",
        adresse: { street: "AouinaStreet", zipCode: 1100, country: "Tunisia" },
      },
      email: "test@test.com",
      deleveryMethod: "fatest",
    };

    axios
      .post("/orders.json", dataToPost)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let formComponent = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) formComponent = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {formComponent}
      </div>
    );
  }
}
