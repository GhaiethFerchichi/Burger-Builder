import Auxiliaire from "../../../HOC/Auxiliaire/Auxiliaire";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  const attachedSideDrawerClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close,
  ].join(" ");
  return (
    <Auxiliaire>
      <Backdrop show={props.open} clicked={props.sideDrawerCloseHandler} />

      <div className={attachedSideDrawerClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems> </NavigationItems>
        </nav>
      </div>
    </Auxiliaire>
  );
};
export default SideDrawer;
