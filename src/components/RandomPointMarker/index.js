/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { useQuery } from "react-query";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { fetchWeatherDetailsByLatLng } from "services/apis";
import PointMarker from "components/PointMarker";

const RandomPointMarker = ({ position, toponymName }) => {
    const { status, data } = useQuery(["weather", position], fetchWeatherDetailsByLatLng, {
        staleTime: 600000,
    });

    const weatherData = data ? { ...data, toponymName } : {};

    return <PointMarker status={status} weatherData={weatherData} position={position} />;
};

export default RandomPointMarker;
