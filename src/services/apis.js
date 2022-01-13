const countriesBaseURL = "https://countriesnow.space/api/v0.1/countries/";
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?";
const key = process.env.REACT_APP_API_KEY;

const fetchCountries = async () => {
    const res = await fetch(`${countriesBaseURL}/positions`);
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
    const res = await fetch(`${weatherBaseURL}q=${city}&units=metric&appid=${key}`);

    return res.json();
};

const fetchWeatherDetailsByLatLng = async ({ queryKey }) => {
    const [, [lat, lng]] = queryKey;

    const res = await fetch(`${weatherBaseURL}lat=${lat}&lon=${lng}&units=metric&appid=${key}`);

    return res.json();
};

export {
    fetchCountries,
    fetchCitiesByCountry,
    fetchWeatherDetailsByCity,
    fetchWeatherDetailsByLatLng,
};
