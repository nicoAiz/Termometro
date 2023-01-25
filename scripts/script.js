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

  // Conversão
  const converted = convertUnits(fromUnit, toUnit, inputValue)

  // Checagem de erros
  if (!converted) return displayError('Escolha escalas diferentes.')
  if (isNaN(converted.value)) return console.error('Socorro, joão!')
  
  // Exibição de dados
  displayValue(converted.value, converted.celsiusValue)
}

function convertUnits(fromUnit, toUnit, value) {
  switch(fromUnit + toUnit) {
    case 'CF': {
      const newValue = calc_C_F(value)
      return {
        value: newValue,
        celsiusValue: calc_F_C(newValue)
      }
    }

    case 'CK': {
      const newValue = calc_C_K(value)
      return {
        value: newValue,
        celsiusValue: calc_K_C(newValue)
      }
    }
      
    case 'KC': {
      const newValue = calc_K_C(value)
      return {
        value: newValue,
        celsiusValue: newValue
      }
    }

    case 'KF': {
      const newValue = calc_C_F(calc_K_C(value))
      return {
        value: newValue,
        celsiusValue: calc_F_C(newValue)
      }
    }

    case 'FC': {
      const newValue = calc_F_C(value)
      return {
        value: newValue,
        celsiusValue: newValue
      }
    }

    case 'FK': {
      const newValue = calc_C_K(calc_F_C(value))
      return {
        value: newValue,
        celsiusValue: calc_K_C(newValue)
      }
    }
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