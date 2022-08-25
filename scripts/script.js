let pEscalaOptions = document.getElementById("pEscala");
let sEscalaOptions = document.getElementById("sEscala");

function converterEscala(paran1,paran2) {
  let pEscalaResult = pEscalaOptions.options[pEscalaOptions.selectedIndex];
  let sEscalaResult = sEscalaOptions.options[sEscalaOptions.selectedIndex];

  let pInput = document.getElementById("pValorEscala").value;

  paran1 = pEscalaResult.value;
  paran2 = sEscalaResult.value;

  switch(paran1 + paran2) {
    case "CelsiusFahrenheit": {
      let res = calc_C_F(pInput);
      displayResult(res, calc_F_C(res));
      break;
    }

    case "CelsiusKelvin":{
      let res = calc_C_K(pInput);
      displayResult(res, calc_K_C(res));
      break;
    }
      
    case "KelvinCelsius":{
      let res = calc_K_C(pInput);
      displayResult(res, res);
      break;
    }

    case "KelvinFahrenheit": {
      let res = calc_K_F(pInput);
      displayResult(res, calc_F_C(res));
      break;
    }

    case "FahrenheitCelsius": {
      let res = calc_F_C(pInput);
      displayResult(res, res);
      break;
    }

    case "FahrenheitKelvin": {
      let res = calc_F_K(pInput);
      displayResult(res, calc_K_C(res));
      break;
    }

    default:
      displayError();
      break;
  }
  
  if(pInput === "") {
    displayNoInput();
  }

}

function displayResult(res, celsius) {
  let result = document.getElementsByClassName("result")[0];
  let img = document.createElement("img");
  
  result.innerHTML = '<p>' + res.toFixed(0) + '</p>';
  result.classList.remove("hidden");
  
  if(celsius >= 30) {
    img.src = "images/hot.svg";
    result.appendChild(img);
  } else if(celsius <= 0) {
    img.src = "images/cold.svg";
    result.appendChild(img);
  } else {
    img.src = "images/warm.svg";
    result.appendChild(img);
  }
}

function displayError() {
  let result = document.getElementsByClassName("result")[0];
  result.innerHTML = "Coloque escalas diferentes!";
  result.classList.remove("hidden");
}

function displayNoInput() {
  let result = document.getElementsByClassName("result")[0];
  result.innerHTML = "Defina um valor válido!";
  result.classList.remove("hidden");
}

function calc_C_F(value) {
  let C = parseFloat(value);
  return C * 1.8 + 32;
}

function calc_C_K(value) {
  let C = parseFloat(value);
  return C + 273;
}

function calc_K_C(value) {
  let K = parseFloat(value);
  return K - 273;
}

function calc_K_F(value) {
  let K = parseFloat(value);
  return (K-273) * 1.8 + 32;
} 

function calc_F_C(value) {
  let F = parseFloat(value);
  return (F-32) / 1.8;
}

function calc_F_K(value) {
  let F = parseFloat(value);
  return (F-32) * 5 / 9 + 273;
}