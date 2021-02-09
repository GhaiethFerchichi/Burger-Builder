import React, { Component } from "react";
import Button from "../../../../Components/UI/Button/Button";
import Spinner from "../../../../Components/UI/Spinner/Spinner";
import axios from "../../../../axios-orders";

import classes from "./ContactData.module.css";
import Input from "../../../../Components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "street" },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "zipCode" },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "country" },
        value: "",
      },
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "E-mail" },
        value: "",
      },
      deleveryMethod: {
        elementType: "select",
        elementConfig: {
          placeholder: "Method",
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
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
    const formElementArray = [];
    for (let key in this.state.orderForm)
      formElementArray.push({ id: key, config: this.state.orderForm[key] });

    let formComponent = (
      <form>
        {formElementArray.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
          />
        ))}
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
