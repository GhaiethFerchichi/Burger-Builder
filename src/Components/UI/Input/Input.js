import classes from "./Input.module.css";

const Input = (props) => {
  const { label, elementType, elementConfig, value } = props;

  let inputElement;
  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          placeholder={elementConfig.placeholder}
        >
          <option value="none" disabled selected>
            {elementConfig.placeholder}
          </option>
          {elementConfig.options.map((el) => (
            <option key={el.value} value={el.value}>
              {el.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
