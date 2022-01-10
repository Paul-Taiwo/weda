/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Marker } from "react-leaflet";
import Leaflet from "leaflet";
import { useQuery } from "react-query";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import PopUp from "components/PopUp";
import { fetchWeatherDetailsByLatLng } from "services/apis";
import { renderWeatherIcon } from "utils/functions";

const myIconCluster = (url) =>
    Leaflet.icon({
        iconUrl: url,
        iconSize: [40, 40],
    });

const RandomPointMarker = ({ position }) => {
    const { status, data } = useQuery(["weather", position], fetchWeatherDetailsByLatLng, {
        staleTime: 15000,
    });

    const weatherState = data?.weather[0].main || "";

    return (
        <Marker icon={myIconCluster(renderWeatherIcon(weatherState).url)} position={position}>
            <PopUp
                status={status}
                data={data}
                WeatherIcon={renderWeatherIcon(weatherState).Icon()}
            />
        </Marker>
    );
};

export default RandomPointMarker;
