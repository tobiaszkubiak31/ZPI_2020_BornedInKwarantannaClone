import React from 'react'
import PrototypeComponent from '../components/PrototypeComponenet'
import {validateNumber} from '../utils/ValidatingFunctions'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('prototype component should render', async () => {
    const { getByText } = render(<PrototypeComponent/>)
    expect(getByText('Prototyp aplikacji 1.0')).toBeInTheDocument()
    expect(getByText('Oblicz')).toBeInTheDocument()
}

test('validateNumber function should return false with string', async () => {
    const toTest = "abcdefg"
    expect(validateNumber(toTest)).toBe(false)
})

test('validateNumber function should return false with numbers and letters', async () => {
    const toTest = "123asd"
    expect(validateNumber(toTest)).toBe(false)
})

test('validateNumber function should return true', async () => {
    const toTest = "100"
    expect(validateNumber(toTest)).toBe(true)
})