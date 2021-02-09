import React from "react";
import Layout from "./HOC/Layout/Layout";
import Checkout from "./Containers/BurgerBuilder/Checkout/Checkout";
import Orders from "./Containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "./Components/UI/Spinner/Spinner";

// import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
const BurgerBuilder = React.lazy(() =>
  import("./Containers/BurgerBuilder/BurgerBuilder")
);
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/Checkout" component={Checkout} />
          <Route path="/Orders" component={Orders} />
          <Route
            path="/"
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <BurgerBuilder {...props} />
              </Suspense>
            )}
          />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
