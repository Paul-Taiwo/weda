/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import Leaflet from "leaflet";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import "leaflet/dist/leaflet.css";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import RandomPointMarker from "components/RandomPointMarker";
import Logo from "components/Logo";
import PopUp from "components/PopUp";
import SearchBar from "components/SearchBar";
import { fetchNearbyCities, fetchWeatherDetailsByLatLng } from "services/apis";
import { renderWeatherIcon } from "utils/functions";
import { LOCATION } from "constants";
import GlobalStyle from "styles/GlobalStyle";
import locationIcon from "../../assets/img/location.svg";

const myIcon = Leaflet.icon({
    iconUrl: locationIcon,
    iconSize: [120, 120],
});

const defaultCoords = [6.465422, 3.406448]; // Lagos

const Map = () => {
    const markerRef = useRef();

    const [userPosition, setUserPosition] = useState(defaultCoords);

    const [lat, lng] = userPosition;

    const { status, data, isRefetching } = useQuery(
        ["mainLocationWeather", userPosition],
        fetchWeatherDetailsByLatLng,
        {
            staleTime: 60000,
            onSuccess: () => !isRefetching && markerRef.current.openPopup(),
        },
    );

    // Fetch nearby cities from user position
    const { data: geoNamesData } = useQuery(["nearByLocations", userPosition], fetchNearbyCities, {
        staleTime: 60000,
    });

    const onSuccess = (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setUserPosition(coords);

        // Update position in local storage
        localStorage.setItem(LOCATION, JSON.stringify(coords));
    };

    const onError = () => null;

    useEffect(() => {
        localStorage.setItem(LOCATION, JSON.stringify(defaultCoords)); // Save default location to local storage

        let watcher;
        if ("geolocation" in navigator) {
            watcher = navigator.geolocation.getCurrentPosition(onSuccess, onError, {
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

            <Logo />
            <StyledMapContainer
                center={[lat, lng]}
                zoom={14}
                scrollWheelZoom
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
                        WeatherIcon={renderWeatherIcon(
                            data?.weather[0].description,
                            data?.sys.sunrise,
                            data?.sys.sunset,
                        ).Icon()}
                    />
                </Marker>

                {geoNamesData &&
                    geoNamesData.geonames.map((geoName) => (
                        <RandomPointMarker
                            key={geoName.geonameId}
                            toponymName={geoName.toponymName}
                            position={[+geoName.lat, +geoName.lng]}
                        />
                    ))}
            </StyledMapContainer>
        </>
    );
};

const StyledMapContainer = styled(MapContainer)`
    width: 100%;
    height: 100vh;
`;

export default Map;
