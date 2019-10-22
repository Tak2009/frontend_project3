
const table = document.querySelector("#table")
const portList = document.querySelector("#portfolio_list")
const newForm = document.querySelector("#new_form")
const openSelection = document.querySelector("#open_new")
const openAccBtn = document.querySelector("#open_button")
const openingAmt = document.querySelector("#open_account")
const data = []
const dataLabels = []
const dataFigures = []

API.getPortfolios().then(portfolios => renderPortfolios(portfolios))
API.getFXRates().then(fxrates => renderSelectOption(fxrates))

/////////render portfolios\\\\\\\\\\\\\\\\\\\\
const renderPortfolios = (portfolios) => {
  portfolios.forEach(p => renderPortfolio(p))
}

///////////Render portfolio\\\\\\\\\\\\\\\\
const renderPortfolio = (p) => {
    
  const div = document.createElement("div")
  div.id = p.id
  const h3 = document.createElement("h3")
  h3.innerText = `${p.exchange.currency.slice(-3)}: ${p.local_amt.toLocaleString()}, which is equivalent to GBP: ${p.home_amt.toLocaleString()}`

  const dBtn = document.createElement("button")
  dBtn.innerText = "Close this account"
  dBtn.addEventListener("click", (e) => {
    deleteAcc(h3, div)
  })

  h3.insertAdjacentElement("beforeend", dBtn)
  div.append(h3)
  portList.appendChild(div)
  dataLabels.push(`${p.exchange.currency.slice(-3)}`)
  dataFigures.push(p.home_amt)
   
  data.push(dataLabels)
  data.push(dataFigures)
  drawGraph(data)
  //  calcExpo(data)　//機能しない理由が解明するまでコメントアウトし直接drawGraphへ
};

///////////Reder option in 2\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const renderSelectOption = (fxrates) => {
  console.log(fxrates)
  openSelection.innerHTML = " "
  fxrates.forEach(r => {
    const curOption = document.createElement("option")
    curOption.innerText = `${r.id}. ${r.currency.slice(-3)}`
    curOption.className = `exchnage-${r.id}`
    openSelection.appendChild(curOption)

  })
};

//////////////Open new account\\\\\\\\\\\\\\\\\\\\\\\\\\\
newForm.addEventListener("submit", (e) => {
  //back-end. Passimistic as i need id for rerendering portforlio
  const id = parseInt(openSelection.value.replace(/[^0-9]/g, ''));
  const newAcc = {
    local_amt: openingAmt.value,
    home_amt: 0,
    exchange_id: id
  };
  API.createNewAcc(newAcc)//.then(p => renderPortfolio(p))
});

////////delete\\\\\\\\\\\
const deleteAcc = (h3, div) => {
  //front-end
  h3.parentNode.remove()
  //back-end
  const id = div.id
  console.log(id)
  API.deletePort(id)
}

  

//聞くこと///////////////////Graph\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\聞くこと
  // const calcExpo = (data) => {
  //  const sum = data[1].reduce(function(acum, current){
  //    acum + current})

  // let sum = 0; //need to use let
  //   const total = function(arr){
    
  //   arr.forEach(function(el){
  //       sum += el;
  //   });
  //  };
  //  total(data[1])
  //  const dataRatio = data[1].map(el =>{
  //   el/sum})
  //  data[1] = dataRatio  //undefineになるので聞け
  //  drawGraph(data)
 // };



const drawGraph = function(data){
    const ctx = document.getElementById('graph').getContext('2d');
    const datas = {
      labels: data[0],
      datasets: [{
        backgroundColor: ["rgba(200,20,20,0.3)","rgba(20,200,20,0.3)","rgba(20,20,200,0.3)"],
        hoverBackgroundColor: ["rgba(250,20,20,0.3)","rgba(20,250,20,0.3)","rgba(20,20,250,0.3)"],
        data: data[1]
      }]
    };
    const config = {
      type: 'pie',
      data: datas
    };
    const myChart = new Chart(ctx, config);
  };
  
  
  // window.onload=function () {
  //     var data = [['A', 'B', 'C'],
  //                 [200, 100, 50]]
  //     drawGraph(data);
  // };