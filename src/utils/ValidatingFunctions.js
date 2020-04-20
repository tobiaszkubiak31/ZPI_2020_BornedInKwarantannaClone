export function validateNumber(inputNumber){
  let number = parseFloat(inputNumber)
  let isValid = false

  if ( !isNaN(number) && number > 0) {
    isValid = true
  }

  return isValid
}

export function validateChosenOptions(state, product) {
  let isValid = false

  if(state !== "" && product !== "") {
    isValid = true
  }

  return isValid
}