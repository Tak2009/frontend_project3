
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


const patchFxRate = (id, obj) =>{
    return fetch(`${FX_RATES_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accpet": "application/json"
        },
        body: JSON.stringify(obj)
    })
}

API = {getFXRates, getPortfolios, createNewAcc, deletePort, patchFxRate};

//test start\\\
const dummyData = {
    id: 5,
    rate: 1.3 //from 1.2985
} 

API.patchFxRate(5, dummyData);
//test end\\