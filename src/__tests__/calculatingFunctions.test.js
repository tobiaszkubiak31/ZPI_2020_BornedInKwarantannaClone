import { getTaxCoef, findProductByName, calculateSuggestedPrice, calculateDataForProductInState, createData } from '../utils/calculatingFunctions'

// FAKE DATA

const state = {
    name: "Alabama",
    groceries: 0.4,
    preparedFood: 0.4,
    prescriptionDrug: 0.0,
    nonPrescriptionDrug: 0.4,
    clothing: 0.04,
    intangibles: 0.4,
    logistics: 0.1,
}

const productsList = [
    {
        product: "Apple",
        category: "groceries",
        wholesale_price: 0.24,
    },
    {
        product: "Oxycodone",
        category: "nonPrescriptionDrug",
        wholesale_price: 16.99,
    },
    {
        product: "Orange",
        category: "groceries",
        wholesale_price: 0.35,
    }
]   

// Testing function - getTaxCoef()

test('should return proper Tax Coef', async () => {

    const product = {
        product: "Apple",
        category: "groceries",
        wholesalePrice: 0.24,
    }

    let outcome = getTaxCoef(state, product)

    expect(outcome).toBe(0.4)
})

// Testing function - findProductByName()

test('should find proper product object', async () => {
    const productName = "Oxycodone"

    const rightProduct = {
        product: "Oxycodone",
        category: "nonPrescriptionDrug",
        wholesale_price: 16.99,
    }

    let outcome = findProductByName(productName, productsList)
    expect(outcome.product).toBe(rightProduct.product)
    expect(outcome.category).toBe(rightProduct.category)
    expect(outcome.wholesalePrice).toBe(rightProduct.wholesalePrice)
})

// Testing function - calculateSuggestedPrice

test('should calculate proper suggested price for ten percent margin', async () => {
    const productName = "Oxycodone"
    const percentMargin = 10

    let outcome = calculateSuggestedPrice(productName, productsList, state, percentMargin);

    const expectedOutcome = 27.42

    expect(outcome).toBe(expectedOutcome)
})

test('should calculate proper suggested price for twenty percent margin', async () => {
    const productName = "Oxycodone"
    const percentMargin = 20

    let outcome = calculateSuggestedPrice(productName, productsList, state, percentMargin);

    const expectedOutcome = 31.21

    expect(outcome).toBe(expectedOutcome)
})

// Testing function - calculateDataForProductInState

test('should calculate proper data for certain data', async () => {

    const productName = "Oxycodone"
    
    const customerPrice = 27.32
    const wholesalePrice = 16.99

    let outcome = calculateDataForProductInState(state, productName, productsList, customerPrice, wholesalePrice)

    let expectedOutcome = createData("Alabama", "7.81", 0.1, "9.74", "2.42")

    expect(outcome.state).toBe(expectedOutcome.state)
    expect(outcome.tax).toBe(expectedOutcome.tax)
    expect(outcome.logistics).toBe(expectedOutcome.logistics)
    expect(outcome.percentMargin).toBe(expectedOutcome.percentMargin)
    expect(outcome.margin).toBe(expectedOutcome.margin)
})