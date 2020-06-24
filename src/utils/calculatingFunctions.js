export function getTaxCoef(state, product) {
    for (var property of Object.entries(state)) {
      if (property[0] === product.category) {
        return property[1]
      }
    }
}

export function findProductByName(name, products) {
    for (let product of products) {
      if (product.product === name) {
        return product
      }
    }
}

export function calculateSuggestedPrice (chosenProductName, productsList, currentState, percentMargin) {
    let currentProduct = findProductByName(chosenProductName, productsList)

    let taxCoefficient = getTaxCoef(currentState, currentProduct)

    let logistics = parseFloat(currentState.logistics)

    let wholesalePrice = parseFloat(currentProduct.wholesale_price)

    let suggestedPrice = -((percentMargin+100)*(taxCoefficient+1)*(logistics+wholesalePrice))/(percentMargin*taxCoefficient - 100)

    if(suggestedPrice%0.01<0.005) {
        suggestedPrice = suggestedPrice + 0.005
    }
    
    return parseFloat(suggestedPrice.toFixed(2))
}

export function calculateDataForProductInState (currentState, productName, productsList, customerPrice, wholesalePrice) {
    let stateName = currentState.name
    let currentProduct = findProductByName(productName, productsList)

    let taxCoefficient = getTaxCoef(currentState, currentProduct) + 1
    let prizeWithoutTax = (
      customerPrice / taxCoefficient
    )
    let tax = (customerPrice - prizeWithoutTax)
    let margin = (prizeWithoutTax - wholesalePrice)

    //Uwzgledniamy koszty logistyki
    margin = (margin - currentState.logistics)

    let percentMargin = (parseFloat(margin) / (parseFloat(wholesalePrice) + parseFloat(tax) + parseFloat(currentState.logistics) ) ) * 100.0
    
    percentMargin = percentMargin.toFixed(2)
    tax = tax.toFixed(2)
    margin = margin.toFixed(2)

    return createData(stateName, tax, currentState.logistics, percentMargin, margin)
  }

export function createData(state, tax, logistics, percentMargin, margin) {
  return { state, tax, logistics, percentMargin, margin };
};