import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/Checkout">Checkout</NavigationItem>
      <NavigationItem link="/Orders">Orders</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
