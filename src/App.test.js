import React from "react";
import { rest } from "msw";
import { setUpServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

//----test if app renders
it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />);
});

//----- https://stackoverflow.com/questions/64101927/how-to-implement-jest-test-for-axios-and-hooks-useeffect ----
jest.mock("axios");
const data = {
  name: "Bananas",
  country: "Colombia",
  cost: 1,
  instock: 4,
  id: 10,
};

afterEach(() => {
  jest.clearAllMocks();
})

test ('fetches product', async() => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(data));
  });
  await expect(axios.get).toHaveBeenCalledWith("http://localhost:1337/api/products");

  await expect(axios.get).toHaveBeenCalledTimes(1);
})
//---------https://jestjs.io/docs/mock-functions-------
// jest.mock("axios");
// test("should fetch products",
//   async () => {
//     const products = {
//       name: "Bananas",
//       country: "Colombia",
//       cost: 1,
//       instock: 4,
//       id: 10,
//     };
//     const resp = {data: products};
//     axios.get.mockResolvedValue(resp);
//     expect(data).toEqual(products);
//   });

//------tutorial steps  ---/////
// jest.mock("axios");

// it("should restock products", () => {
//   const getSpy = jest.spyOn(axios, "get");
//   const { getByText } = render(<App />);
//   act(() => {
//     const button = getByText("ReStock Products");
//     fireEvent.click(button);
//   });

//   expect(getSpy).toBeCalled();
// });

//---- attempt to follow steps from video ---///
// jest.mock('axios');
// const mockGetProduct = (axios.get = jest.fn());

// test("should fetch products", async () => {
//   mockGetProduct.mockResolvedValueOnce({
//     name: "Bananas",
//     country: "Colombia",
//     cost: 1,
//     instock: 4,
//     id: 10,
//   });

//   const { getByText } = render(<App />);

//   const button = getByText("ReStock Products");
//   fireEvent.click(button);

//   await waitFor(() => getByText('Bananas'));

//   expect(mockGetProduct).toBeCalledTimes(1);
//   expect(mockGetProduct).toBeCalledWith(
//     "/products",
//     expect.objectContaining({ text: "Bananas" })
//   );
// });

//----test if button calls function
// it('restock button calls function', async() => {
//   const app = shallow(<App />);
//   const instance = app.instance();
//   const spy = jest.spyOn(instance, 'onClick')
//   instance.forceUpdate();

//   fireEvent.click(getByText("ReStock Products"));
//   expect(spy).toHaveBeenCalled()
// })

//----attempt to test API call----------//
// it('restockProducts is called', async() => {
//   const restockProductsMock = jest.fn();
//   const { getByText } = render(<App />);
//   fireEvent.click(getByText("ReStock Products"));
//   expect(restockProductsMock).toHaveBeenCalled();
// });

//----attempt to test API call----------//
// jest.mock('axios')
// it('restockProducts is called', () => {
//   const restockMock = jest.spyOn(App, 'restockProducts(url)');
//   const shallowApp = shallow((<App />));
//   fireEvent.click(getByText("ReStock Products"));
//   shallowApp.update();
//   expect(restockMock).toHaveBeenCalled();
// });

//----attempt to test API call----------//
// const mockGetProduct =
//   {
//     name: "Bananas",
//     country: "Colombia",
//     cost: 1,
//     instock: 4,
//     id: 10,
//   }
// const mockResponse = {data: mockGetProduct};
// axios.get.mockResolvedValue(mockResponse);

// return Products.all().then(data => expect(data).toEqual(products));

// describe('returns product', () => {
//   const mockURL = '/api/products';
//   const { getByText, getByLabelText } = render(<App />);

//   const mockGetProduct =
//           {
//             name: "Bananas",
//             country: "Colombia",
//             cost: 1,
//             instock: 4,
//             id: 10,
//           };
//   const getProduct = jest.fn(url => mockGetProduct);
//   fireEvent.click(getByText('ReStock Products'));

//   it('returns product name from an api call', () => {
//     expect(getProduct(mockURL)).toBe(mockGetProduct);
//   });
//   it('called getProduct with a mockUrl', () => {
//     expect(getProduct).toHaveBeenCalledWith(mockURL);
//   });
// });
