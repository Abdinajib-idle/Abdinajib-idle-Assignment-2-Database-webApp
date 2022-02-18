let mainT = document.getElementById("table");
let tBody = document.getElementById("tbody")
let rowAdder = document.getElementById("Add-activity-btn");
let result = document.getElementById("outPutLabel");

var counter = 4;

function calculatePercentage(n) {
    let stdG = document.getElementById("currentg" + n).value;
    let maxGrade = document.getElementById("overall" + n).value;
    let finalG = document.getElementById("percentage" + n);
    if (stdG == "" || maxGrade == "") {
        finalG.innerHTML = "";
    }
    else {
        finalG.innerHTML = Number(Number(stdG) / Number(maxGrade) * 100).toFixed(3) + '%';

    }

}
rowAdder.addEventListener('click', function appendNewRow() {
    ++counter;
    let Trs = document.createElement("table-rows");

    let templateRow = `
<tr class="table-rows">
<td>Activity`+ counter + `</td>
    <td>\ A`+ counter + `\ </td>
    <td class="inputData"><input id="weighted`+ counter + `" name="weighted" type="number" min=0>
    </td>
    <td onchange="calculatePercentage(`+ counter + `)" class="inputData">
    <input id="currentg`+ counter + `" type="number" min=0>
    /
    <input type="number" id="overall`+ counter + `" min=0></input>
    </td>
   
    <td>
        <label name="Tpercentage" type="text" >
            <p id="percentage`+ counter + `"></p>
        </label>
        </td>
    </td>
</tr>`;
    Trs.innerHTML = templateRow;
    tBody.append(Trs);

})

//Eventlistener+task to calculate the mean grade
let mean_calc = document.getElementById("meanbtn");
mean_calc.addEventListener('click', function meanCalculator() {
    let AllGrades = [];
    let tot_MaxGrade = [];
    let mean = 0.0;

    for (let i = 0; i < counter; i++) {
        let loopinTheStdScores = document.getElementById("currentg" + (i + 1)).value;
        let sumOfMaxGrades = document.getElementById("overall" + (i + 1)).value;
        if (loopinTheStdScores[i] == "" && sumOfMaxGrades[i] == "") {
            alert('You have empty cells! these will not be considered in the calculations')
            continue;
        }
        else {
            AllGrades[i] = loopinTheStdScores;
            tot_MaxGrade[i] = sumOfMaxGrades;
        }
        mean += (AllGrades[i] / 100) * i;
    }

    result.innerHTML = " The Mean grade is: " + mean.toFixed(3);
});

//Eventlistener+task to calculate the weighted grades
let weight_Calc = document.getElementById("weightedBtn");
weight_Calc.addEventListener('click', function calculateWeight() {
    let allStdGrades = Number(0.000);
    let allMaxMark = Number(0.000);
    let allMaxWeight = Number(0.000);
    let realTotWeight = Number(0.000);
    let newCounter = Number(4);
    for (let i = 0; i < newCounter; i++) {
        let weights = document.getElementById("weighted" + (i + 1)).value;
        let stdGrades = document.getElementById("currentg" + (i + 1)).value;
        let maxPossibleMark = document.getElementById("overall" + (i + 1)).value;
        if (weights[i] == "" && stdGrades[i] == "") {
            alert('You have empty entries which will not be used in the calculations');
            continue;
        }
        else {
            allMaxWeight.value += weights[i];
            allStdGrades.value += stdGrades[i];
            allMaxMark.value += maxPossibleMark[i];

        }
        realTotWeight.value += Number(allStdGrades.value / allMaxMark.value) * Number(allMaxWeight.value);

    }
    result.innerHTML = 'The Weighted grade is:' + Number(realTotWeight);

})
window.onload = function () {
    setInterval(50000, 1000);
}