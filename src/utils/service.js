import axios from 'axios';

const API_URL = 'http://localhost:8080'

export async function getAllStates() {
    const response = await axios.get(`${API_URL}/states`)

    const fakeResponse = [
        {
            name: "Alabama",
            groceries: 0.4,
            preparedFood: 0.4,
            prescriptionDrug: 0.0,
            nonPrescriptionDrug: 0.4,
            clothing: 0.04,
            intangibles: 0.4,
            logistics: 0.1,
        },
        {
            name: "Alaska",
            groceries: 0.0,
            preparedFood: 0.0,
            prescriptionDrug: 0.0,
            nonPrescriptionDrug: 0.0,
            clothing: 0.0,
            intangibles: 0.0,
            logistics: 0.1,
        },
        {
            name: "California",
            groceries: 0.0,
            preparedFood: 0.0725,
            prescriptionDrug: 0.0,
            nonPrescriptionDrug: 0.0725,
            clothing: 0.0725,
            intangibles: 0.0,
            logistics: 0.1,
        }
    ]

    return fakeResponse
}

export async function getAllProducts() {
    const response = await axios.get(`${API_URL}/products`)

    const fakeResponse = [
        {
            product: 'apple',
            category: 'groceries',
            wholesalePrice: 0.24,
        },
        {
            product: 'orange',
            category: 'groceries',
            wholesalePrice: 0.35,
        },
        {
            product: 'pineapple',
            category: 'groceries',
            wholesalePrice: 0.78,
        },
        {
            product: 'Oxycodone',
            category: 'nonPrescriptionDrug',
            wholesalePrice: 16.99,
        },
        {
            product: 'Fentanyl',
            category: 'nonPrescriptionDrug',
            wholesalePrice: 13.58,
        },
        {
            product: 'Morphine',
            category: 'nonPrescriptionDrug',
            wholesalePrice: 128.67,
        },
        {
            product: 'Sweater',
            category: 'clothing',
            wholesalePrice: 118.56,
        },
        {
            product: 'Baseball Hat',
            category: 'clothing',
            wholesalePrice: 20.14,
        },
        {
            product: 'Mittens',
            category: 'clothing',
            wholesalePrice: 9.99,
        },
        {
            product: 'Ramen',
            category: 'preparedFood',
            wholesalePrice: 3.54,
        },
        {
            product: 'Canned beans',
            category: 'preparedFood',
            wholesalePrice: 1.24,
        },
        {
            product: 'Tomato puree',
            category: 'preparedFood',
            wholesalePrice: 0.78,
        },
    ]

    return fakeResponse
}