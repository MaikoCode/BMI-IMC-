const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m
// BMI (Body mass index)


let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");
let displayBMI = document.querySelector(".result");
let displayStatus = document.querySelector(".result__label");


form.addEventListener("submit", handleForm);

function handleForm(e){
  e.preventDefault();
  calculateBMI();
}


function calculateBMI(){
  const height = inputs[0].value;
  const weight = inputs[1].value;

  if(!height || !weight || height <= 0 || weight <= 0){
    handleError();
    return;
  }

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);
  showResult(BMI);
}

function handleError(){
  displayBMI.textContent = "Whops";
  displayBMI.style.color = "inherit";
  displayStatus.textContent = "Remplissez correctment les champs.";
}

function showResult(BMI){
  const rank = BMIData.find(data => {
    if(BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if(typeof data.range === "number" && BMI >= data.range) return data;
  });

  displayBMI.textContent = BMI;
  displayBMI.style.color = `${rank.color}`;
  displayStatus.textContent = `Result : ${rank.name}`;
}

