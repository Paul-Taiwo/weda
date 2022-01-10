import { CloudyIcon, HazeIcon, RainyIcon, StormIcon, SunnyIcon } from "components/VectorIcons";
import location from "../assets/img/location.svg";
import storm from "../assets/img/storm.svg";
import haze from "../assets/img/haze.svg";
import rainy from "../assets/img/rainy.svg";
import sunny from "../assets/img/sunny.svg";
import clouds from "../assets/img/clouds.svg";

/**
 * getRandomLocation
 * @param {number} latitude Latitude
 * @param {number} longitude Longitude
 * @param {number} distance Distance
 * @returns {array} [lat, lng]
 */
const getRandomLocation = (latitude, longitude, distance = 12000) => {
    // Convert to radians
    const lat = latitude * (Math.PI / 180);
    const lng = (longitude * Math.PI) / 180;

    let radius;

    // Distance should be set in meters, negative for exact distance
    if (distance < 0) {
        // Exact distance
        radius = Math.abs(distance);
    } else {
        // Get uniformly-random distribution within peovided distance
        // http://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
        radius = Math.random() + Math.random();
        radius = radius > 1 ? 2 - radius : radius;
        radius *= distance || 10000; // multiply by distance meters
    }

    // Convert radius from meters to degrees to radians
    // 111319.9 meters = one degree along the equator
    radius /= 111319.9;
    // Correction for the actual distance from equator is NOT needed here
    // radius *= Math.cos(lat);
    // Convert to radians
    radius *= Math.PI / 180;

    // Random angle
    const angle = Math.random() * Math.PI * 2;

    let nLng;
    let nLat = Math.asin(
        Math.sin(lat) * Math.cos(radius) + Math.cos(lat) * Math.sin(radius) * Math.cos(angle),
    );
    if (Math.cos(nLat) === 0) {
        nLng = lng;
    } else {
        nLng =
            ((lng - Math.asin((Math.sin(angle) * Math.sin(radius)) / Math.cos(nLat)) + Math.PI) %
                (Math.PI * 2)) -
            Math.PI;
    }

    // Convert to degrees
    nLat *= 180 / Math.PI;
    nLng *= 180 / Math.PI;

    return [nLat, nLng];
};

const renderWeatherIcon = (weatherState) => {
    switch (weatherState) {
        case "Sunny":
        case "Clear":
            return { url: sunny, Icon: SunnyIcon };
        case "Clouds":
            return { url: clouds, Icon: CloudyIcon };
        case "Rain":
        case "Drizzle":
        case "Mist":
            return { url: rainy, Icon: RainyIcon };
        case "Haze":
        case "Fog":
            return { url: haze, Icon: HazeIcon };
        case "Storm":
        case "Thunderstorm":
            return { url: storm, Icon: StormIcon };

        default:
            return { url: location, Icon: () => null };
    }
};
export { getRandomLocation, renderWeatherIcon };
