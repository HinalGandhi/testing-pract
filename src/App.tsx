import React, { useState } from "react";
import Chart from "./Components/Chart";
import Mock from "./Components/Mock";

const Counter = () => {
const [counter, setCounter] = useState(0);

const incrementCounter = () => {
setCounter((prevCounter) => prevCounter + 1);
};

const decrementCounter = () => {
if (counter < 1) return;
setCounter((prevCounter) => prevCounter - 1);
};

return (
<>
<Chart />
<button data-testid="increment" onClick={incrementCounter}>
+
</button>
<p data-testid="counter">{counter}</p>
<button  data-testid="decrement" onClick={decrementCounter}>
-
</button>
<Mock />
</>
);
};

export default Counter;