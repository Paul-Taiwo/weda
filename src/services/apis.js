const countriesBaseURL = "https://countriesnow.space/api/v0.1/countries/";
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?";

const fetchCountries = async () => {
    const res = await fetch(`${countriesBaseURL}/positions`);
    return res.json();
};

const fetchCitiesByCountry = async (country) => {
    const res = await fetch(`${countriesBaseURL}/cities`, {
        method: "POST",
        body: JSON.stringify({ country }),
    });
    return res.json();
};

const fetchWeatherDetailsByCity = async (city) => {
    const res = await fetch(
        `${weatherBaseURL}q=${city}&units=metric&appid=510512bd6428bb49ce2a9f94726fa0fd`,
    );

    return res.json();
};

const fetchWeatherDetailsByLatLng = async ({ queryKey }) => {
    const [, [lat, lng]] = queryKey;

    const res = await fetch(
        `${weatherBaseURL}lat=${lat}&lon=${lng}&units=metric&appid=510512bd6428bb49ce2a9f94726fa0fd`,
    );

    return res.json();
};

export {
    fetchCountries,
    fetchCitiesByCountry,
    fetchWeatherDetailsByCity,
    fetchWeatherDetailsByLatLng,
};
