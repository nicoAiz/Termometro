// Interação com o DOM
document.querySelector('[data-btn-convert]').addEventListener('click', buttonPressed)
document.querySelector('[name=input-value]').addEventListener('keydown', e => e.key === 'Enter' && buttonPressed())

function buttonPressed() {
  const fromUnitElem = document.querySelector('[name=from-unit]')
  const toUnitElem = document.querySelector('[name=to-unit]')
  const fromUnit = fromUnitElem.options[fromUnitElem.selectedIndex].value
  const toUnit = toUnitElem.options[toUnitElem.selectedIndex].value
  
  const inputValue = parseFloat(document.querySelector('[name=input-value]').value)
  if (!inputValue) return displayError('Insira um valor válido.')
  if (toUnit === fromUnit) return displayError('Escolha escalas diferentes.')

  // Conversão e checagem de erros
  const converted = convertUnits(fromUnit, toUnit, inputValue)
  if (converted == null) return displayError('Algo deu errado.')
  
  // Exibição de dados
  const inCelsius = convertUnits(toUnit, 'C', converted)
  displayValue(converted, inCelsius)
}

function convertUnits(fromUnit, toUnit, value) {
  switch(fromUnit + toUnit) {
    case 'CC': case 'KK': case 'FF': return value
    case 'CF': return calc_C_F(value)
    case 'CK': return calc_C_K(value)
    case 'KC': return calc_K_C(value)
    case 'KF': return calc_C_F(calc_K_C(value))
    case 'FC': return calc_F_C(value)
    case 'FK': return calc_C_K(calc_F_C(value))
  }
}

// Funções que interagem com o DOM
function displayValue(value, valueInCalsius) {
  document.querySelector('.result').innerHTML = `
    <p>${Math.round(value)}</p>
    <img src='images/${valueInCalsius >= 30 ? 'hot' : valueInCalsius <= 0 ? 'cold' : 'warm'}.svg'>
  `
}

function displayError(errorMessage) {
  const resultElem = document.querySelector('.result')
  resultElem.innerHTML = errorMessage
  resultElem.classList.remove('hidden')
}

// Funções de conversão
function calc_K_C(value) {
  return value - 273
}

function calc_F_C(value) {
  return (value - 32) / 1.8
}

function calc_C_F(value) {
  return value * 1.8 + 32
}

function calc_C_K(value) {
  return value + 273
}