
const FX_RATES_URL = "http://localhost:3000/exchanges";
const PORTFOLIOS_URL = "http://localhost:3000/portfolios"

const getFXRates = () => {
    return fetch(FX_RATES_URL)
    .then(resp => resp.json())
};

const getPortfolios = () => {
    return fetch(PORTFOLIOS_URL)
    .then(resp => resp.json())
}

API = {getFXRates, getPortfolios}