/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { forwardRef } from "react";
import { Marker } from "react-leaflet";
import Leaflet from "leaflet";
import PropTypes from "prop-types";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import PopUp from "components/PopUp";
import { renderWeatherIcon } from "utils/functions";

const myIconCluster = (url) =>
    Leaflet.icon({
        iconUrl: url,
        iconSize: [50, 50],
    });

const PointMarker = forwardRef(({ status, position, weatherData }, ref) => {
    const weatherState = weatherData?.weather ? weatherData.weather[0].description : "";

    return (
        <Marker
            ref={ref}
            icon={myIconCluster(renderWeatherIcon(weatherState).url)}
            position={position}
        >
            <PopUp
                status={status}
                data={weatherData}
                WeatherIcon={renderWeatherIcon(
                    weatherState,
                    weatherData?.sys?.sunrise,
                    weatherData?.sys?.sunset,
                ).Icon()}
            />
        </Marker>
    );
});

PointMarker.propTypes = {
    status: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    weatherData: PropTypes.shape({
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string,
            }),
        ),
        sys: PropTypes.shape({
            sunrise: PropTypes.number,
            sunset: PropTypes.number,
        }),
    }).isRequired,
};

export default PointMarker;
