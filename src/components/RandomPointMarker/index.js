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

const RandomPointMarker = ({ position }) => {
    const { status, data } = useQuery(["weather", position], fetchWeatherDetailsByLatLng, {
        staleTime: 15000,
    });

    return <PointMarker status={status} weatherData={data} position={position} />;
};

export default RandomPointMarker;
