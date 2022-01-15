/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React, { forwardRef } from "react";
import { ArrowMaxIcon, ArrowMinIcon, HumidityIcon, Loader, WindIcon } from "components/VectorIcons";
import PropTypes from "prop-types";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { StyledPopUp } from "./styles";

const PopUp = forwardRef(({ status, data, WeatherIcon }, ref) => {
    return (
        <StyledPopUp className="custom-popup" ref={ref}>
            {status === "loading" && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <Loader height="25px" />
                    <p className="m-0 mt-2">Loading Data</p>
                </div>
            )}

            {status === "success" && (
                <>
                    <div className="d-flex mb-2">
                        <div className="w-50 mt-3">
                            <h4 className="city-name m-0">{data?.toponymName || data?.name}</h4>

                            <p className="city-temperature mt-2 mb-0">{data.main.temp}°</p>
                            <div className="city-weather__condition">
                                <p className="m-0">{data.weather[0].description}</p>
                            </div>
                        </div>

                        <div className="w-50 d-flex align-items-center justify-content-center ps-2">
                            {WeatherIcon}
                        </div>
                    </div>

                    <div className="d-flex mb-3">
                        <div className="w-50 d-flex flex-column align-items-center">
                            <ArrowMinIcon />

                            <span className="city-temperature__min mt-2">
                                {data.main.temp_min}°
                            </span>
                            <span className="min__text">Min</span>
                        </div>

                        <div className="w-50 d-flex flex-column align-items-center">
                            <ArrowMaxIcon />

                            <span className="city-temperature__max mt-2">
                                {data.main.temp_max}°
                            </span>
                            <span className="max__text">Max</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                        <div className="w-50 border-right text-center">
                            <p className="m-0">
                                <span className="me-2">
                                    <WindIcon />
                                </span>
                                Wind
                            </p>
                        </div>

                        <div className="w-50 text-center">
                            <p className="m-0">{data.wind.speed} meter/sec</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="w-50 border-right text-center">
                            <p className="m-0">
                                <span className="me-2">
                                    <HumidityIcon />
                                </span>
                                Hum
                            </p>
                        </div>

                        <div className="w-50 text-center">
                            <p className="m-0">{data.main.humidity}%</p>
                        </div>
                    </div>
                </>
            )}
        </StyledPopUp>
    );
});

PopUp.defaultProps = {
    WeatherIcon: () => null,
    data: {},
};

PopUp.propTypes = {
    status: PropTypes.string.isRequired,
    WeatherIcon: PropTypes.element,
    data: PropTypes.PropTypes.shape({
        name: PropTypes.string,
        toponymName: PropTypes.string,
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string,
            }),
        ),
        sys: PropTypes.shape({
            sunrise: PropTypes.number,
            sunset: PropTypes.number,
        }),
        main: PropTypes.shape({
            humidity: PropTypes.number,
            temp: PropTypes.number,
            temp_min: PropTypes.number,
            temp_max: PropTypes.number,
        }),
        wind: PropTypes.shape({
            speed: PropTypes.number,
        }),
    }),
};

export default PopUp;
