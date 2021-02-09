import classes from "./Input.module.css";

const Input = (props) => {
  const { label, elementType, elementConfig, value, changeFn } = props;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let inputElement;
  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...elementConfig}
          onChange={changeFn}
          value={value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...elementConfig}
          onChange={changeFn}
          value={value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          placeholder={elementConfig.placeholder}
          onChange={changeFn}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
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
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changeFn}
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
