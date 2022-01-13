const countriesBaseURL = "https://countriesnow.space/api/v0.1/countries/";
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?";
const geonamesBaseURL =
    "https://secure.geonames.org/findNearbyPlaceNameJSON?&radius=290&maxRows=30&";

const openweathermapApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const geonamesUsername = process.env.REACT_APP_GEONAMES_USERNAME;

const fetchCountries = async () => {
    const res = await fetch(`${countriesBaseURL}/positions`);
    return res.json();
};

const fetchNearbyCities = async ({ queryKey }) => {
    const [lat, lng] = queryKey[1];

    const res = await fetch(`${geonamesBaseURL}lat=${lat}&lng=${lng}&username=${geonamesUsername}`);

    return res.json();
};

const fetchCitiesByCountry = async ({ queryKey }) => {
    const country = queryKey[1];

    const res = await fetch(`${countriesBaseURL}cities`, {
        method: "POST",
        body: JSON.stringify({ country }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return res.json();
};

const fetchWeatherDetailsByCity = async (city) => {
    const res = await fetch(
        `${weatherBaseURL}q=${city}&units=metric&appid=${openweathermapApiKey}`,
    );

    return res.json();
};

const fetchWeatherDetailsByLatLng = async ({ queryKey }) => {
    const [, [lat, lng]] = queryKey;

    const res = await fetch(
        `${weatherBaseURL}lat=${lat}&lon=${lng}&units=metric&appid=${openweathermapApiKey}`,
    );

    return res.json();
};

export {
    fetchCountries,
    fetchNearbyCities,
    fetchCitiesByCountry,
    fetchWeatherDetailsByCity,
    fetchWeatherDetailsByLatLng,
};
