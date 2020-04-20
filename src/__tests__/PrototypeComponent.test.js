import React from 'react'
import PrototypeComponent from '../components/PrototypeComponenet'
import { render, getByLabelText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {validateNumber} from '../utils/ValidatingFunctions'

test('validateNumber function should return false with string', async = () => {
    const toTest = "abcdefg"
    expect(validateNumber(toTest)).toBe(false)
})

test('validateNumber function should return false with numbers and letters', async = () => {
    const toTest = "123asd"
    expect(validateNumber(toTest)).toBe(false)
})

test('validateNumber function should return true', async = () => {
    const toTest = "100"
    expect(validateNumber(toTest)).toBe(true)
})