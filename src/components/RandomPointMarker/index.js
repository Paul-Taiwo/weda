/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

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

RandomPointMarker.defaultProps = {
    toponymName: null,
};

RandomPointMarker.propTypes = {
    toponymName: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RandomPointMarker;
