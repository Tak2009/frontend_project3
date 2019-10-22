
const FX_RATES_URL = "http://localhost:3000/exchanges";
const PORTFOLIOS_URL = "http://localhost:3000/portfolios"


const getFXRates = () => {
    return fetch(FX_RATES_URL)
    .then(resp => resp.json())
};

const getPortfolios = () => {
    return fetch(PORTFOLIOS_URL)
    .then(resp => resp.json())
};

const createNewAcc = (newAcc) => {
    return fetch(PORTFOLIOS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newAcc)
    }).then(resp => resp.json())
};

const deletePort = (id) => {
    return fetch(`${PORTFOLIOS_URL}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify()
    })
};

API = {getFXRates, getPortfolios, createNewAcc, deletePort};