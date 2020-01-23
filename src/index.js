
const table = document.querySelector("#table")
const portList = document.querySelector("#portfolio_list")
const newForm = document.querySelector("#new_form")
const openSelection = document.querySelector("#open_new")
const openAccBtn = document.querySelector("#open_button")
const openingAmt = document.querySelector("#open_account")
const data = []
const dataLabels = []
const dataFigures = []
let dataPercentage = []
let fxIdRatesArray = []
let sum = 0


API.getPortfolios().then(portfolios => renderPortfolios(portfolios))
API.getFXRates().then(fxrates => renderSelectOption(fxrates))

/////////render portfolios\\\\\\\\\\\\\\\\\\\\
const renderPortfolios = (portfolios) => { 
  portfolios.forEach(p => renderPortfolio(p));
  sum = dataFigures.reduce((accum, val) => accum + val, 0)     //once all the ports rendered, program comes back here hence sum can be calc
  renderSumtoYourPort(sum)
  calcPercentage(sum, dataFigures)
  //pass data to graph
  data.push(dataLabels)
  data.push(dataPercentage)
  drawGraph(data)
}

///////////Render portfolio\\\\\\\\\\\\\\\\
const renderPortfolio = (p) => {
    
  const div = document.createElement("div")
  div.id = p.id
  div.className = "row1"
  const h3 = document.createElement("h3")
  h3.innerText = `${p.exchange.currency.slice(-3)}: ${p.local_amt.toLocaleString()}, which is equivalent to GBP: ${p.home_amt.toLocaleString()}`

  const dBtn = document.createElement("button")
  dBtn.innerText = "Close"
  dBtn.className = "button"
  dBtn.addEventListener("click", (e) => {
    deleteAcc(h3, div)
  })

  h3.insertAdjacentElement("beforeend", dBtn)
  div.append(h3)
  portList.appendChild(div)
  dataLabels.push(`${p.exchange.currency.slice(-3)}`)
  dataFigures.push(p.home_amt)
  
};

///////add sum line in your portfolio section\\\\\\\\\\
const renderSumtoYourPort = (sum) => {
  const div = document.createElement("div")
  div.id = "portfolio-total"
  div.className = "row2"
  const h3 = document.createElement("h3")
  h3.innerText = `The total amount of your portfolio is GBP: ${sum.toLocaleString()}`
  div.append(h3)
  portList.appendChild(div)
};

//////////calc % for graph\\\\\\\\\\\\
const calcPercentage = (sum, dataFigures) => {
  dataFigures.map(val => {dataPercentage.push(val/sum)}) 
  //dataFigures.map(val => {(val/sum)}) did not work. 3 undefineds stored in an array
}

///////////Render option in 2\\\\\\\\\\\\\\\\\\\\
const renderSelectOption = (fxrates) => {
  console.log(fxrates)

  //タスク１：FXIDとRateだけのハッシュを作ってhome currencyベースの残高を作る際に使う
  fxIdRatesArray = fxrates.map(obj => ({[obj.id]: obj.rate })); 

  // タスク２：select optionの表示とタグ作り
  openSelection.innerHTML = " "　
  fxrates.forEach(r => { 
  const curOption = document.createElement("option")
  curOption.value = r.id  //https://stackoverflow.com/questions/1170386/passing-hidden-input-fields-in-html-select-option
  curOption.innerText = `${r.id}.${r.currency.slice(-3)}`
  curOption.className = `exchnage-${r.id}`
  openSelection.appendChild(curOption)
  })
};

//////////////Open new account\\\\\\\\\\\\\\\\\\\
newForm.addEventListener("submit", (e) => {
  //back-end. Passimistic as i need id for rerendering portforlio
  const id = parseInt(openSelection.value.replace(/[^0-9]/g, ''));
  //Objectの配列から特定のキーに値が一致するものを取り出す　参考http://lifelog.main.jp/wordpress/?p=2557
  //to get key = id, check test.js file
  let fxRateforHomeValueCalc = fxIdRatesArray.filter(function(rate, index){
    if (Object.keys(rate) == id) return true;
  });
  
  const newAcc = {
    local_amt: openingAmt.value,
    home_amt: openingAmt.value / fxRateforHomeValueCalc[0][id],
    exchange_id: id
  };
  API.createNewAcc(newAcc).then(p => renderPortfolio(p))
  //to calc to include newly created port
  // sum = dataFigures.reduce((accum, val) => accum + val, 0)
  // calcPercentage(sum, dataFigures)
});

////////delete\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const deleteAcc = (h3, div) => {
  //front-end
  h3.parentNode.remove()
  //back-end
  const id = div.id
  console.log(id)
  API.deletePort(id)
}

  

/////////////////////Graph\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
  
  
//// window.onload=function () {
////     var data = [['A', 'B', 'C'],
////                 [200, 100, 50]]
////     drawGraph(data);
//// };