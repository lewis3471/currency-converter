import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App/>)
  const input = document.getElementsByClassName('amountInput')[0];
  return {
    input,
    ...utils,
  }
}

test('checks amount text', () => {
  render(<App />);

  const linkElement = screen.getByText(/Amount:/i);
  expect(linkElement).toBeInTheDocument();
});


test('check if whole numbers are accepted as input', () => {
  const {input} = setup();

  const field = document.getElementsByClassName('amountInput')[0]; 
  expect(field).toBeDefined(); 
  expect(field).toHaveValue(null); 

  fireEvent.change(input, {target: {value: '23'}})
  expect(input.value).toBe('23');
});


test('check if floats are accepted as input', () => {
  const {input} = setup();

  const field = document.getElementsByClassName('amountInput')[0]; 
  expect(field).toBeDefined(); 
  expect(field).toHaveValue(null); 

  fireEvent.change(input, {target: {value: '23.21'}})
  expect(input.value).toBe('23.21');
});


test('check that strings are not accepted as input', () => {
  const {input} = setup();

  const field = document.getElementsByClassName('amountInput')[0]; 
  expect(field).toBeDefined(); 
  expect(field).toHaveValue(null); 

  fireEvent.change(input, {target: {value: 'abc'}})
  expect(input.value).toBe("");
});
