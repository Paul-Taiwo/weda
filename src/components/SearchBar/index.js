/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { useRef, useState } from "react";
import Control from "react-leaflet-custom-control";
import styled from "styled-components";
import Select, { createFilter } from "react-select";
import { Alert, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import { useMap } from "react-leaflet";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { fetchCountries, fetchCitiesByCountry, fetchWeatherDetailsByCity } from "services/apis";
import PointMarker from "components/PointMarker";
import { ArrowUpCircleIcon } from "components/VectorIcons";
import SearchIcon from "components/VectorIcons/SearchIcon";

const initError = {
    show: false,
    msg: "",
};

const SearchBar = () => {
    const map = useMap();
    const markerRef = useRef();

    const [collapse, setCollapse] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [error, setError] = useState(initError);

    const [marker, setMarker] = useState({
        show: false,
        data: null,
        position: [0, 0],
    });

    // Fetch list of countries
    const { data: countries, isLoading: isLoadingCountries } = useQuery(
        "countries",
        fetchCountries,
        {
            staleTime: Infinity,
        },
    );

    const mutation = useMutation(fetchWeatherDetailsByCity, {
        onSuccess: (data) => {
            if (data.cod === 200) {
                map.closePopup();

                const position = [data.coord.lat, data.coord.lon];
                setMarker({
                    show: true,
                    data,
                    position,
                });

                map.flyTo(position);

                // Take time before showing popup because of the map panning
                setTimeout(() => markerRef.current.openPopup(), 2000);
            } else {
                // Handle Error
                const msg =
                    data.message === "city not found"
                        ? "No data available for this city"
                        : data.message;

                setError({
                    show: true,
                    msg,
                });
            }
        },
    });

    // Search form
    const form = useFormik({
        initialValues: {
            selectedCountry: null,
            selectedCity: null,
        },
        onSubmit: ({ selectedCity }) => {
            // Get weather data
            mutation.mutate(selectedCity.value, {
                onSettled: () => {
                    // Reset submit on settled
                    form.setSubmitting(false);
                },
            });
        },
    });

    // Fetch list of cities in selected country
    const {
        status,
        data: cities,
        isLoading: isLoadingCities,
    } = useQuery(["cities", form.values.selectedCountry?.value], fetchCitiesByCountry, {
        enabled: !!form.values.selectedCountry,
        staleTime: Infinity,
        retry: false,
        onSuccess: (response) => {
            if (response.error) {
                const msg =
                    response.msg === "country not found"
                        ? "No cities found for this country"
                        : response.msg;

                // Show error message
                setError({
                    show: true,
                    msg,
                });

                // Disable submit button because there's no city to search
                setDisableSubmit(true);
            } else {
                // Reset disabled button and error state
                setError(initError);
                setDisableSubmit(false);
            }
        },
    });

    // Country list
    const countriesOption = !isLoadingCountries
        ? countries.data.map(({ name }) => ({
              value: name,
              label: name,
          }))
        : [];

    // City list
    const citiesOption =
        status === "success" && !isLoadingCities
            ? cities?.data?.map((city) => ({
                  value: city,
                  label: city,
              }))
            : [];

    return (
        <Control position="topright">
            <Wrapper
                onSubmit={form.handleSubmit}
                className={`position-relative px-3 py-4 ${collapse ? "collapse-search" : ""}`}
            >
                <button
                    type="button"
                    className="btn btn-toggle p-0"
                    onClick={() => setCollapse(!collapse)}
                >
                    {collapse ? <SearchIcon /> : <ArrowUpCircleIcon />}
                </button>

                <div className="main-search">
                    <h4 className="text-white mb-3">Search for city</h4>

                    {error.show && (
                        <Alert className="py-2" variant="danger">
                            {error.msg}
                        </Alert>
                    )}

                    <div className="mb-2">
                        <Select
                            id="countries"
                            placeholder="Select a country"
                            options={countriesOption}
                            value={form.values.selectedCountry}
                            isLoading={isLoadingCountries}
                            isDisabled={isLoadingCountries}
                            onChange={(country) => {
                                form.setFieldValue("selectedCountry", country);
                                form.setFieldValue("selectedCity", null);
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <Select
                            id="cities"
                            placeholder="Select a city"
                            options={citiesOption}
                            value={form.values.selectedCity}
                            isLoading={isLoadingCities}
                            isDisabled={isLoadingCities}
                            filterOption={createFilter({ ignoreAccents: false })}
                            onChange={(city) => {
                                form.setFieldValue("selectedCity", city);
                            }}
                        />
                    </div>

                    <div className="d-flex">
                        <Button
                            disabled={disableSubmit || form.isSubmitting}
                            className="btn-submit me-3"
                            type="submit"
                        >
                            Search
                        </Button>

                        <Button className="btn-submit" type="button">
                            Reset map
                        </Button>
                    </div>
                </div>
            </Wrapper>

            {marker.show && (
                <PointMarker
                    ref={markerRef}
                    status="success"
                    weatherData={marker.data}
                    position={marker.position}
                />
            )}
        </Control>
    );
};

const Wrapper = styled.form`
    background-color: #014351;
    width: 300px;
    height: 100%;
    border-radius: 10px;
    transition: all 0.3s ease;
    will-change: width, padding;

    h4 {
        font-size: 1rem;
    }

    .main-search {
        will-change: display;
    }

    .btn {
        &-submit {
            background-color: #00ca90;
            border: none;
            border-radius: 5px;
            font-size: 0.875rem;
            line-height: 0.75rem;
            height: 30px;
            min-width: 80px;
        }

        &-toggle {
            width: 26px;
            height: 26px;
            top: 20px;
            right: 17px;
            position: absolute;
            border-radius: 50%;
            display: grid;
            place-items: center;
            will-change: position, top, right, border-radius;
        }
    }

    &.collapse-search {
        width: unset;
        padding: 0.5rem !important;

        .main-search {
            display: none;
        }

        .btn-toggle {
            position: relative !important;
            top: unset;
            right: unset;
            border-radius: unset;
        }
    }
`;

export default SearchBar;
