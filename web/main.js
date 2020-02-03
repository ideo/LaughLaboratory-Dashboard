var totalLaugh = 0
var measureCount = 0

let laughterThreshold = 0.2
let laughToMoneyExchangeRate = 10
let laughToTokenCap = 5

function didPressSpacebar() {
    eel.saveEel();
}

document.onkeyup = function(e){
    if(e.keyCode == 32){
        // alert("Space pressed!");
        eel.saveEel(1);
        resetInterface();
        document.getElementById("token-container").innerHTML  = ""
    }
}   

function resetInterface() {
    totalLaugh = 0;
    measureCount = 0;
}
 
eel.expose(test)
function test(param) {
    console.log("I have been summoned by " + param)
    // document.getElementById("score").innerHTML = param /
    // console.log(param*100 + "%")
}

eel.expose(recieveLaugh)
function recieveLaugh(laughScore) {
    updateUI(laughScore)
    if(laughScore > laughterThreshold) {
        addLaugh(laughScore)
    } else {
        document.getElementById("fluid").style.background = "none"
    }
}

function updateUI(laughScore) {
    document.getElementById("score").innerHTML = laughScore.toFixed(2)
    document.getElementById("fluid").style.height = laughScore*100 + "%"
    if(measureCount > 5) {
        addCompletedLaughToken();
        measureCount = 0;
    }
    document.getElementById("total").style.height = (measureCount/laughToTokenCap)*100 + "%"
    // console.log(laughScore*100 + "%")
}

function addLaugh(laughScore) {
    document.getElementById("fluid").style.background = "#669DDD"
    totalLaugh += laughScore
    measureCount += 1
    // addLaughToTableView(laughScore)
    // updatePrice()
    // refreshLaughScore()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// async function addLaughToTableView(laughScore) {
//     var table = document.getElementById("receiptTable");
//     var row = table.insertRow(0);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     row.classList.add("receipt-row")
//     cell1.classList.add("receipt-item");
//     cell2.classList.add("receipt-price");
//     cell1.innerHTML = "<div class=\"receipt-item\">" + laughScore.toFixed(2) + "</div>";
//     cell2.innerHTML = "<div class=\"receipt-price\">" + (totalLaugh * laughToMoneyExchangeRate).toFixed(2) + "</div>";
//     // await sleep(1);
//     // cell1.classList.add("active");
//     // cell2.classList.add("active");
// }

function addCompletedLaughToken() {
    var token = document.createElement("DIV")
    token.classList.add("token")
    document.getElementById("token-container").appendChild(token)
}

function refreshLaughScore() {
    document.getElementById("total").innerHTML = totalLaugh
}

function updatePrice() {
    price = totalLaugh * laughToMoneyExchangeRate
    document.getElementById("price").innerHTML = "$" + price.toFixed(2)
}