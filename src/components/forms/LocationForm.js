import { useState } from "react";

import useInput from "../../hooks/use-input";
import classes from "./LocationForm.module.css";

const LocationForm = (props) => {
  const [formHasError, setFormHasError] = useState(false);

  const {
    value: enteredLatitude,
    isValid: enteredLatitudeIsValid,
    hasError: latitudeInputHasError,
    valueChangeHandler: latitudeInputChangeHandler,
    inputBlurHandler: latitudeInputBlurHandler,
    reset: resetLatitudeInput,
  } = useInput(
    (value) => value.trim() !== "" && isFinite(value) && Math.abs(value) <= 90
  );

  const {
    value: enteredLongitude,
    isValid: enteredLongitudeIsValid,
    hasError: longitudeInputHasError,
    valueChangeHandler: longitudeInputChangeHandler,
    inputBlurHandler: longitudeInputBlurHandler,
    reset: resetLongitudeInput,
  } = useInput(
    (value) => value.trim() !== "" && isFinite(value) && Math.abs(value) <= 180
  );

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredLatitudeIsValid || !enteredLongitudeIsValid) {
      setFormHasError(true);
      return;
    }

    const locationData = {
      latitude: parseFloat(enteredLatitude),
      longitude: parseFloat(enteredLongitude),
    };

    props.onAddLocationData(locationData);

    resetLatitudeInput();
    resetLongitudeInput();
  };

  const latitudeInputClasses = latitudeInputHasError
    ? classes["form-control-invalid"]
    : classes["form-control"];

  const longitudeInputClasses = longitudeInputHasError
    ? classes["form-control-invalid"]
    : classes["form-control"];

  return (
    <form autoComplete="on" onSubmit={submitHandler}>
      {formHasError && (
        <p className={classes["error-text"]}>
          Please enter the required data below.
        </p>
      )}
      <div className={latitudeInputClasses}>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          value={enteredLatitude}
          onBlur={latitudeInputBlurHandler}
          onChange={latitudeInputChangeHandler}
        />
        {latitudeInputHasError && (
          <p className={classes["error-text"]}>Enter a valid latitude!</p>
        )}
      </div>
      <div className={longitudeInputClasses}>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          value={enteredLongitude}
          onBlur={longitudeInputBlurHandler}
          onChange={longitudeInputChangeHandler}
        />
        {longitudeInputHasError && (
          <p className={classes["error-text"]}>Enter a valid longitude!</p>
        )}
      </div>
      <div className={classes["form-actions"]}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default LocationForm;
