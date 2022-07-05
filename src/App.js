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
      `${process.env.REACT_APP_API_URI}&latitude=${locationData.latitude}&longitude=${locationData.longitude}`
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
          <p>
            Hi, <br /> Welcome to the CyWeather Weather Forecast. <br /> Want to
            find today's weather forecast? <br />
            Look no further just enter the required details below and click
            Submit.
          </p>
          <LocationForm onAddLocationData={submitLocationDataHandler} />
        </Card>
      </section>
      <section className={classes.section2}>
        {loadedForecast ? (
          <Card>
            <h1 className={classes.title}>Awesome, here are the results!</h1>
            <h4>Latitude: {loadedForecast.latitude}</h4>
            <h4>Longitude: {loadedForecast.longitude}</h4>
            <div className={classes["table-data"]}>
              <table>
                <thead>
                  <tr>
                    <th>Time (ISO 8601)</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedForecast.hourly.time.slice(6, 19).map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Temperature (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedForecast.hourly.temperature_2m
                    .slice(6, 19)
                    .map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Wind speed (km/h)</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedForecast.hourly.windspeed_120m
                    .slice(6, 19)
                    .map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Humidity (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedForecast.hourly.relativehumidity_2m
                    .slice(6, 19)
                    .map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Cloud cover (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {loadedForecast.hourly.cloudcover_mid
                    .slice(6, 19)
                    .map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <h1 className={classes.warning}>No result! </h1>
        )}
      </section>
    </Fragment>
  );
};

export default App;
