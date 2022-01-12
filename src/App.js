/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import Leaflet from "leaflet";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import "leaflet/dist/leaflet.css";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import RandomPointMarker from "components/RandomPointMarker";
import PopUp from "components/PopUp";
import SearchBar from "components/SearchBar";
import { fetchWeatherDetailsByLatLng } from "services/apis";
import { getRandomLocation, renderWeatherIcon } from "utils/functions";
import { LOCATION } from "constants";
import GlobalStyle from "styles/GlobalStyle";
import locationIcon from "./assets/img/location.svg";

const myIcon = Leaflet.icon({
    iconUrl: locationIcon,
    iconSize: [120, 120],
});

const defaultCoords = [6.465422, 3.406448]; // Lagos

const App = () => {
    const markerRef = useRef();

    localStorage.setItem(LOCATION, JSON.stringify(defaultCoords));
    const [userPosition, setUserPosition] = useState(defaultCoords);

    const [lat, lng] = userPosition;

    const { status, data, isRefetching } = useQuery(
        ["mainLocationWeather", userPosition],
        fetchWeatherDetailsByLatLng,
        {
            staleTime: 15000,
            onSuccess: () => !isRefetching && markerRef.current.openPopup(),
        },
    );

    const onSuccess = (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setUserPosition(coords);
        localStorage.setItem(LOCATION, JSON.stringify(coords));
    };

    const onError = () => null;

    const randomCords = useMemo(() => {
        const coords = [];

        for (let i = 0; i < 100; i += 1) {
            const randomPoint = getRandomLocation(lat, lng);
            coords.push(randomPoint);
        }

        return coords;
    }, []);

    useEffect(() => {
        let watcher;
        if ("geolocation" in navigator) {
            watcher = navigator.geolocation.watchPosition(onSuccess, onError, {
                enableHighAccuracy: true,
            });
        }

        return () => {
            navigator.geolocation.clearWatch(watcher);
            localStorage.removeItem(LOCATION);
        };
    }, []);

    return (
        <>
            <GlobalStyle />

            <StyledMapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={false}
                tileSize={512}
                zoomOffset={-1}
                zoomControl={false}
            >
                <SearchBar />
                <ZoomControl position="bottomright" />
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

                {/* {randomCords.map((position) => (
                    <RandomPointMarker key={position} position={position} />
                ))} */}
            </StyledMapContainer>
        </>
    );
};

const StyledMapContainer = styled(MapContainer)`
    width: 100%;
    height: 100vh;
`;

export default App;
