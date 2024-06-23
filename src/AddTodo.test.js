import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});



  test('test that App component doesn\'t render dupicate Task', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "05/30/2023";
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    fireEvent.click(element); // Attempt to add the same task again
    const check = screen.getAllByText(/History Test/i);
    expect(check.length).toBe(1); // Ensure only one instance of the task exists
  });
  

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(checkDate).not.toBeInTheDocument(); // Task should not be added
 });

  test('test that App component doesn\'t add a task without due date', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.click(element);
    const check = screen.queryByText(/History Test/i);
    expect(check).not.toBeInTheDocument(); // Task should not be added
  });


 test('test that App component can be deleted thru checkbox', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "05/30/2023";
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    const deleteCheckbox = screen.getByRole('checkbox');
    fireEvent.click(deleteCheckbox); // Simulate deleting the task
    const check = screen.queryByText(/History Test/i);
    expect(check).not.toBeInTheDocument(); // Task should be removed
  });


 test('test that App component renders different colors for past due events', () => {
    render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "05/30/2023"; // A past date to ensure the task is late
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    const historyCheck = screen.getByTestId(/History Test/i);
    expect(historyCheck.style.backgroundColor).toBe("rgb(255, 204, 204)"); // Assuming light red is #ffcccc
  });

