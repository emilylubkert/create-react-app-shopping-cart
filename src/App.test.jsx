import { render, fireEvent, screen, act } from '@testing-library/react'
import App from './App'
import axios from 'axios'

jest.mock('axios')

it.only('it fetches products', async () => {
  render(<App />)
  await act(async () => {
    await axios.get.mockImplementation(() => Promise.resolve())
  })
  fireEvent.click(screen.getByText(/restock products/i))

  expect(axios.get).toHaveBeenCalledWith('http://localhost:1337/api/products')
})
