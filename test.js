//sample
const gLines = [
    {
      ln_file: "T1301451.json",
      ln_key: "1301451",
      ln_name: "[ＪＲ]岩泉線 (茂市～岩泉) "
    },
    {
      ln_file: "T1301541.json",
      ln_key: "1301541",
      ln_name: "[ＪＲ]北上線 (北上～横手) "
    },
    {
      ln_file: "T1301671.json",
      ln_key: "1301671",
      ln_name: "[ＪＲ]磐越東線(ゆうゆうあぶくまライン) (いわき～郡山) "
    }];
  
    var newLine = gLines.filter(function(item, index){
      if (item.ln_key == '1301541') return true;
    });

    //test for my project
const fxRates = [
    {1: 1.5},
    {2: 2},
    {3: 3.5},
    {4: 4}
];

let fxRate = fxRates.filter(function(rate, index){
    if (Object.keys(rate) == "1") return true;
  });

let fxRate2 = fxRates.filter((rate, index) => {
  if (Object.keys(rate) === "1") return true
})

let fxRate3 = fxRates.filter((rate, index) => {
  if (Object.keys(rate) == "1") return true
})
