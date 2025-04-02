import React, { useState } from 'react';

function App() {
    const [result, setResult] = useState(null);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    const calculate = async (operation) => {
        const response = await fetch(`http://localhost:3000/${operation}?num1=${num1}&num2=${num2}`);
        const data = await response.json();
        setResult(data.result);
    };

    return (
        <div>
            <h1>Calculator</h1>
            <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
            <button onClick={() => calculate('add')}>Add</button>
            <button onClick={() => calculate('subtract')}>Subtract</button>
            <button onClick={() => calculate('multiply')}>Multiply</button>
            <button onClick={() => calculate('divide')}>Divide</button>
            <h2>Result: {result}</h2>
        </div>
    );
}

export default App;