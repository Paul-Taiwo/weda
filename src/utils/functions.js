import {
    ThunderStormRainIcon,
    HazeIcon,
    SunnyIcon,
    BrokenCloudsIcon,
    ScatteredCloudsIcon,
    FewCloudsIcon,
    FewCloudsNightIcon,
    HazeNightIcon,
    SnowIcon,
    SnowNightIcon,
    ThunderStormIcon,
    ThunderStormNightIcon,
    ThunderStormRainNightIcon,
    ShowersIcon,
    ShowersNightIcon,
    FreezingRainIcon,
    LightRainIcon,
    LightRainNightIcon,
    HeavyRainIcon,
    HeavyRainNightIcon,
} from "components/VectorIcons";
import location from "../assets/img/location.svg";
import haze from "../assets/img/haze.svg";
import hazeNight from "../assets/img/haze-night.svg";
import sunny from "../assets/img/sunny.svg";
import brokenClouds from "../assets/img/broken-clouds.svg";
import scatteredClouds from "../assets/img/scattered-clouds.svg";
import fewClouds from "../assets/img/few-clouds.svg";
import fewCloudsNight from "../assets/img/few-clouds-night.svg";
import snow from "../assets/img/snow.svg";
import snowNight from "../assets/img/snow-night.svg";
import thunderstorm from "../assets/img/thunderstorm.svg";
import thunderstormNight from "../assets/img/thunderstorm-night.svg";
import thunderstormRain from "../assets/img/thunderstorm-rain.svg";
import thunderstormRainNight from "../assets/img/thunderstorm-rain-night.svg";
import showers from "../assets/img/showers.svg";
import showersNight from "../assets/img/showers-night.svg";
import freezingRain from "../assets/img/freezing-rain.svg";
import lightRain from "../assets/img/light-rain.svg";
import lightRainNight from "../assets/img/light-rain-night.svg";
import heavyRain from "../assets/img/heavy-rain.svg";
import heavyRainNight from "../assets/img/heavy-rain-night.svg";

/**
 * getRandomLocation
 * @param {number} latitude Latitude
 * @param {number} longitude Longitude
 * @param {number} distance Distance
 * @returns {array} [lat, lng]
 */
const getRandomLocation = (latitude, longitude, distance = 10000000000) => {
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

const checkDayTime = (sunrise, sunset) => {
    const currentTime = new Date().getTime();

    return currentTime >= sunrise && currentTime < sunset;
};

/**
 *
 * @param {string} weatherState Weather condition
 * @param {number} sunrise
 * @param {number} sunset
 * @returns {object} { url: "icon url", Icon: "icon React component"}
 */
const renderWeatherIcon = (weatherState, sunrise, sunset) => {
    const isDayTime = checkDayTime(sunrise, sunset);

    switch (weatherState?.toLowerCase()) {
        // Thunderstorm
        case "thunderstorm":
        case "light thunderstorm":
        case "heavy thunderstorm":
        case "ragged thunderstorm": {
            if (isDayTime) {
                return { url: thunderstorm, Icon: ThunderStormIcon };
            }
            return { url: thunderstormNight, Icon: ThunderStormNightIcon };
        }
        case "thunderstorm with light rain":
        case "thunderstorm with rain":
        case "thunderstorm with heavy rain":
        case "thunderstorm with light drizzle":
        case "thunderstorm with drizzle":
        case "thunderstorm with heavy drizzle": {
            if (isDayTime) {
                return { url: thunderstormRain, Icon: ThunderStormRainIcon };
            }
            return { url: thunderstormRainNight, Icon: ThunderStormRainNightIcon };
        }

        // Drizzle / Shower
        case "light intensity drizzle":
        case "drizzle":
        case "heavy intensity drizzle":
        case "light intensity drizzle rain":
        case "drizzle rain":
        case "heavy intensity drizzle rain":
        case "shower rain and drizzle":
        case "heavy shower rain and drizzle":
        case "shower drizzle": {
            if (isDayTime) {
                return { url: showers, Icon: ShowersIcon };
            }
            return { url: showersNight, Icon: ShowersNightIcon };
        }

        // Rain
        case "light rain":
        case "moderate rain": {
            if (isDayTime) {
                return { url: lightRain, Icon: LightRainIcon };
            }
            return { url: lightRainNight, Icon: LightRainNightIcon };
        }

        case "heavy intensity rain":
        case "very heavy rain":
        case "extreme rain": {
            if (isDayTime) {
                return { url: heavyRain, Icon: HeavyRainIcon };
            }
            return { url: heavyRainNight, Icon: HeavyRainNightIcon };
        }

        case "freezing rain":
            return { url: freezingRain, Icon: FreezingRainIcon };

        case "light intensity shower rain":
        case "shower rain":
        case "heavy intensity shower rain":
        case "ragged shower rain": {
            if (isDayTime) {
                return { url: showers, Icon: ShowersIcon };
            }
            return { url: showersNight, Icon: ShowersNightIcon };
        }

        // Snow
        case "light snow":
        case "snow":
        case "heavy snow":
        case "sleet":
        case "light shower sleet":
        case "shower sleet":
        case "light rain and snow":
        case "rain and snow":
        case "light shower snow":
        case "shower snow":
        case "heavy shower snow": {
            if (isDayTime) {
                return { url: snow, Icon: SnowIcon };
            }
            return { url: snowNight, Icon: SnowNightIcon };
        }

        // Atmosphere
        case "mist":
        case "smoke":
        case "haze":
        case "sand/ dust whirls":
        case "fog":
        case "sand":
        case "dust":
        case "volcanic ash":
        case "squalls":
        case "tornado": {
            if (isDayTime) {
                return { url: haze, Icon: HazeIcon };
            }
            return { url: hazeNight, Icon: HazeNightIcon };
        }

        // Clouds
        case "few clouds": {
            if (isDayTime) {
                return { url: fewClouds, Icon: FewCloudsIcon };
            }

            return { url: fewCloudsNight, Icon: FewCloudsNightIcon };
        }
        case "scattered clouds":
            return { url: scatteredClouds, Icon: ScatteredCloudsIcon };
        case "broken clouds":
        case "overcast clouds":
            return { url: brokenClouds, Icon: BrokenCloudsIcon };

        // Clear
        case "clear sky":
            return { url: sunny, Icon: SunnyIcon };

        default:
            return { url: location, Icon: () => null };
    }
};
export { getRandomLocation, renderWeatherIcon, checkDayTime };
