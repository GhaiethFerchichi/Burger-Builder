import burgerImg from "../../assets/images/burger-logo.png";

import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerImg} alt="burgerLogo" />
    </div>
  );
};

export default Logo;
