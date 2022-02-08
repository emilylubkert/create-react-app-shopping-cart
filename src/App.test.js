import React from "react";
import { rest } from "msw";
import { setUpServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";
import axios from "axios";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />);
});

jest.mock("axios");

it("should fetch a new product", () => {
  const { getByText } = render(<App />);

  const getSpy = jest.spyOn(axios, "get");
  act(() => {
    fireEvent.click(getByText("ReStock Products"));
  });
  expect(getSpy).toBeCalled();
});

// const mockProduct =
//   {
//     name: "Bananas",
//     country: "Colombia",
//     cost: 1,
//     instock: 4,
//     id: 10,
//   }
// const mockResponse = {data: mockProduct};
// axios.get.mockResolvedValue(mockResponse);

// return Products.all().then(data => expect(data).toEqual(products));

// describe('returns product', () => {
//   const mockURL = '/api/products';
//   const { getByText, getByLabelText } = render(<App />);

//   const mockProduct =
//           {
//             name: "Bananas",
//             country: "Colombia",
//             cost: 1,
//             instock: 4,
//             id: 10,
//           };
//   const getProduct = jest.fn(url => mockProduct);
//   fireEvent.click(getByText('ReStock Products'));

//   it('returns product name from an api call', () => {
//     expect(getProduct(mockURL)).toBe(mockProduct);
//   });
//   it('called getProduct with a mockUrl', () => {
//     expect(getProduct).toHaveBeenCalledWith(mockURL);
//   });
// });

// const restock = require('../src/components/products');
// const mockAxios = require('axios');
// const responseData = [
//             {
//               name: "Bananas",
//               country: "Colombia",
//               cost: 1,
//               instock: 4,
//               id: 10,
//             },
//           ];

// test('fetches a new product from api', () => {
//   mockAxios.get.mockImplementationOnce(() =>
//   Promise.resolve(responseData));

//   return restock.restockProducts().then(response => {
//     expect(response).toEqual(responseData);
//   });
// });
