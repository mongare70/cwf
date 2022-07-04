import { Fragment, useState } from "react";
import LocationForm from "./components/forms/LocationForm";
import classes from "./App.module.css";
import Card from "./components/ui/Card";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedForecast, setLoadedForecast] = useState();

  const submitLocationDataHandler = async (locationData) => {
    setIsLoading(true);

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=windspeed_120m&hourly=cloudcover_mid`
    );

    const data = await response.json();

    if (data) {
      setIsLoading(false);

      if (data.error) {
        console.log(data.reason);
        return;
      }

      setLoadedForecast(data);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <section className={classes.section1}>
        <Card>
          <h1 className={classes.title}>CyWeather Weather Forecast</h1>
          <p className={classes.intro}>
            Hi, <br /> Welcome to the CyWeather Weather Forecast. <br /> Want to
            find today's weather forecast? <br />
            Look no further just enter the required details below.
          </p>
          <LocationForm onAddLocationData={submitLocationDataHandler} />
        </Card>
      </section>
      <section className={classes.section2}>
        {loadedForecast ? (
          <Fragment>
            <h5>latitude: {loadedForecast.latitude}</h5>
            <h5>Longitude: {loadedForecast.longitude}</h5>
            <div className={classes["table-data"]}>
              <table>
                <tr>
                  <th>Time (ISO 8601)</th>
                </tr>

                {loadedForecast.hourly.time.slice(6, 19).map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val}</td>
                    </tr>
                  );
                })}
              </table>
              <table>
                <tr>
                  <th>Temperature (°C)</th>
                </tr>

                {loadedForecast.hourly.temperature_2m
                  .slice(6, 19)
                  .map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val}</td>
                      </tr>
                    );
                  })}
              </table>
              <table>
                <tr>
                  <th>Wind speed (km/h)</th>
                </tr>

                {loadedForecast.hourly.windspeed_120m
                  .slice(6, 19)
                  .map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val}</td>
                      </tr>
                    );
                  })}
              </table>
              <table>
                <tr>
                  <th>Humidity (%)</th>
                </tr>

                {loadedForecast.hourly.relativehumidity_2m
                  .slice(6, 19)
                  .map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val}</td>
                      </tr>
                    );
                  })}
              </table>
              <table>
                <tr>
                  <th>Cloud cover (%)</th>
                </tr>

                {loadedForecast.hourly.cloudcover_mid
                  .slice(6, 19)
                  .map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </Fragment>
        ) : (
          <p>No result! </p>
        )}
      </section>
    </Fragment>
  );
};

export default App;
