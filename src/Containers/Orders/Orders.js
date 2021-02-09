import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";

export default class Orders extends Component {
  state = {
    orders: null,
    loading: true,
  };

  componentWillMount() {
    axios
      .get("orders.json")
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data)
          fetchedOrders.push({ id: key, ...response.data[key] });

        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  render() {
    let fetchedOrders = <h1>No Data to display</h1>;
    if (this.state.orders)
      fetchedOrders = this.state.orders.map((el) => (
        <Order
          key={el.id}
          ingredients={el.ingredients}
          totalPrice={el.totalPrice}
        />
      ));
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {fetchedOrders}
      </div>
    );
  }
}
