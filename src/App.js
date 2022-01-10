/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import "leaflet/dist/leaflet.css";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import RandomPointMarker from "components/RandomPointMarker";
import PopUp from "components/PopUp";
import { fetchWeatherDetailsByLatLng } from "services/apis";
import { getRandomLocation, renderWeatherIcon } from "utils/functions";
import GlobalStyle from "styles/GlobalStyle";
import loc from "./assets/img/location.svg";

const myIcon = Leaflet.icon({
    iconUrl: loc,
    iconSize: [120, 120],
});
const defaultCoords = [6.465422, 3.406448];

const App = () => {
    const markerRef = useRef();

    const [userPosition, setUserPosition] = useState(defaultCoords);

    const [lat, lng] = userPosition;

    const { status, data } = useQuery(
        ["mainLocationWeather", userPosition],
        fetchWeatherDetailsByLatLng,
        {
            staleTime: 15000,
            onSuccess: () => markerRef.current.openPopup(),
        },
    );

    const randomCords = useMemo(() => {
        const coords = [];

        for (let i = 0; i < 100; i += 1) {
            const randomPoint = getRandomLocation(lat, lng);
            coords.push(randomPoint);
        }

        return coords;
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(
                (position) =>
                    setUserPosition([position.coords.latitude, position.coords.longitude]),
                () => {
                    setUserPosition(defaultCoords);
                },
            );
        } else {
            setUserPosition(defaultCoords);
        }
    }, []);

    return (
        <>
            <GlobalStyle />
            <p>Hello</p>

            <StyledMapContainer
                center={[lat, lng]}
                zoom={14}
                scrollWheelZoom={false}
                tileSize={512}
                zoomOffset={-1}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXlvcGF1bG90IiwiYSI6ImNreTcyOHpmaDExZXkyeG9qaDJmMmJsbmEifQ.eLGWgejsLzmWxie9YkgAnQ"
                />
                <Marker ref={markerRef} icon={myIcon} position={[lat, lng]}>
                    <PopUp
                        status={status}
                        data={data}
                        WeatherIcon={renderWeatherIcon(data?.weather[0].main).Icon()}
                    />
                </Marker>

                {randomCords.map((position) => (
                    <RandomPointMarker key={position} position={position} />
                ))}
            </StyledMapContainer>
        </>
    );
};

const StyledMapContainer = styled(MapContainer)`
    width: 100%;
    height: 100vh;
`;

export default App;
