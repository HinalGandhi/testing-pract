import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "../App";

//test block
test("increments counter", () => {
// render the component on virtual dom
render(<Counter />);

//select the elements you want to interact with
const counter = screen.getByTestId("counter");
const incrementBtn = screen.getByTestId("increment");
const decrementBtn = screen.getByTestId("decrement");

//interact with increment button
fireEvent.click(incrementBtn);

//assert the expected result
expect(counter).toHaveTextContent("1");

//interact with decrement button
fireEvent.click(decrementBtn);
expect(counter).toHaveTextContent("0");
});
