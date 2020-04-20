import React from 'react'
import PrototypeComponent from '../components/PrototypeComponenet'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('prototype component should render', async () => {
    const { getByText } = render(<PrototypeComponent/>)
    expect(getByText('Prototyp aplikacji 1.0')).toBeInTheDocument()
    expect(getByText('Oblicz')).toBeInTheDocument()
})