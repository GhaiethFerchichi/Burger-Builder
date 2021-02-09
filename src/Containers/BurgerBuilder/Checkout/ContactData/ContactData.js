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
        validation: { required: true },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "street" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "zipCode" },
        value: "",
        validation: { required: true, minLength: 5, maxLength: 6 },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "country" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "E-mail" },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
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
        value: "fastest",
        valid: true,
        validation: {},
      },
    },
    loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (const formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    this.setState({ loading: true });
    const dataToPost = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice.toFixed(2),
      orderData: formData,
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

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required && value.trim() !== "")
      isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = updatedOrderForm[inputIdentifier];

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);

    let formIsValid = true;
    for (let formElement in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[formElement].valid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
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
            invalid={!el.config.valid}
            touched={el.config.touched}
            shouldValidate={el.config.validation}
            changeFn={(event) => this.inputChangedHandler(event, el.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
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
