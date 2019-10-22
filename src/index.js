
const table = document.querySelector("#table")
const portList = document.querySelector("#portfolio_list")

API.getFXRates().then(fxrates => renderFXRates(fxrates))

const renderFXRates = (fxrates) => {
    console.log(fxrates)
};

API.getPortfolios().then(portfolios => renderPortfolios(portfolios))

const renderPortfolios = (portfolios) => {
    console.log(portfolios)
    portfolios.forEach(p =>{
      const div = document.createElement("div")
      div.id = p.id
      const h3 = document.createElement("h3")
      h3.innerText = `${p.exchange.currency.slice(-3)}: ${p.local_amt.toLocaleString()}, which is equivalent to GBP: ${p.home_amt.toLocaleString()}`
      const dBtn = document.createElement("button")
      dBtn.innerText = "Close this account"
      h3.insertAdjacentElement("beforeend", dBtn)
      div.append(h3)
      portList.appendChild(div)
    })
};

//Table
// for (let i = 0; i < 3; i++) {
//     const table = document.querySelector("#table");
//     const dl = document.createElement('dl');
//     dl.classList.add('row');
//     table.appendChild(dl); 
//     //　dtタグで列を作る（今回は4つ）
//     for (let j = 0; j < 3; j++) {
//         const dt = document.createElement('dt');
//         dt.classList.add('cell')
//         dt.textContent = `${i}行${j}列`;
//         dl.appendChild(dt); 
//     }
// }

// for (let i = 0; i < 4; i++) {
//   const table = document.querySelector("#table");
//   const dl = document.createElement('dl');
//   dl.classList.add('row');
//   table.appendChild(dl); 
//   //　dtタグで列を作る（今回は4つ）
//   for (let j = 0; j < 3; j++) {
//       const dt = document.createElement('dt');
//       dt.classList.add('cell')
//       dt.textContent = `${i}行${j}列`;
//       dl.appendChild(dt); 
//   }
// }


//Graph
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
  
  
  window.onload=function () {
      var data = [['A', 'B', 'C'],
                  [200, 100, 50]]
      drawGraph(data);
  };