import React, { Component } from "react";
import CheckoutSummary from "../../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

export default class Checkout extends Component {
  state = { ingredients: null, totalPrice: 0 };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "totalPrice") {
        totalPrice = param[1];
      } else ingredients[param[0]] = +param[1];
    }
    console.log(ingredients);
    this.setState({ ingredients, totalPrice: +totalPrice });
  }

  navigateBackFromCheckoutPage = () => {
    this.props.history.goBack();
  };

  navigateToContactPage = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <CheckoutSummary
          navigateToContactPage={this.navigateToContactPage}
          navigateBackFromCheckoutPage={this.navigateBackFromCheckoutPage}
          ingredients={this.state.ingredients}
        />
        {/* <ContactData /> */}

        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
