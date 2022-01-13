/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { forwardRef } from "react";
import { Marker } from "react-leaflet";
import Leaflet from "leaflet";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import PopUp from "components/PopUp";
import { renderWeatherIcon } from "utils/functions";

const myIconCluster = (url) =>
    Leaflet.icon({
        iconUrl: url,
        iconSize: [40, 40],
    });

const PointMarker = forwardRef(({ status, position, weatherData }, ref) => {
    const weatherState = weatherData?.weather ? weatherData.weather[0].main : "";

    return (
        <Marker
            ref={ref}
            icon={myIconCluster(renderWeatherIcon(weatherState).url)}
            position={position}
        >
            <PopUp
                status={status}
                data={weatherData}
                WeatherIcon={renderWeatherIcon(weatherState).Icon()}
            />
        </Marker>
    );
});

export default PointMarker;
