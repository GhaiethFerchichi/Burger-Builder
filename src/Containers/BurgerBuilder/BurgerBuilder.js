import React, { Component } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import Auxiliaire from "../../HOC/Auxiliaire/Auxiliaire";

const INGREDIENTS_PRICES = { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 };

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-fcf72-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => {});
  }

  updatePurchasingHandler = () => {
    // console.log("triggered");
    this.setState({ purchasing: true });
  };

  updatePurchasbleState() {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((keyIng) => {
        return ingredients[keyIng];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const ingredientCount = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    const newStateManager = this.state;
    newStateManager.totalPrice = newPrice;
    newStateManager.ingredients[type] = ingredientCount;
    this.setState({ ...newStateManager });
    this.updatePurchasbleState();
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const ingredientCount = this.state.ingredients[type] - 1;
      const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
      const newStateManager = this.state;
      newStateManager.totalPrice = newPrice;
      newStateManager.ingredients[type] = ingredientCount;
      this.setState({ ...newStateManager });
      this.updatePurchasbleState();
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaeContinueHandler = () => {
    this.setState({ loading: true });
    const dataToPost = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice.toFixed(2),
      customer: {
        name: "Ghaieth Ferchichi",
        adresse: { street: "AouinaStreet", zipCode: 1100, country: "Tunisia" },
      },
      email: "test@test.com",
      deleveryMethod: "fatest",
    };

    axios
      .post("/order.json", dataToPost)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  navigateToCheckoutPage = () => {
    const queryParams = [];
    for (let i in this.state.ingredients)
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    queryParams.push("totalPrice=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };

    for (let ky in disabledInfo) disabledInfo[ky] = disabledInfo[ky] <= 0;
    let orderSummary = null;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Auxiliaire>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            order={this.updatePurchasingHandler}
          />
        </Auxiliaire>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.navigateToCheckoutPage}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <div>
        <Modal
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
