// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// import { server } from './mocks/server.js'
// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());




import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

// import fetch from './_mocks_/fetch';

// global.fetch = fetch;



