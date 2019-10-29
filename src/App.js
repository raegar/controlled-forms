import React, { useEffect, useState  } from "react";
import "./App.css";

const App = () => {
  const [value, setValue] = useState('');

  useEffect(() => console.log(value), [value]);

  const handleChange = event => setValue(event.target.value);
  
  return (
    <div className="App">
      <label>
        My Controlled Input: 
        <input type="text" value={value} onChange={handleChange} />
      </label>

      <p>
        <strong>Output:</strong> {value}
      </p>
    </div>
  );
};

export default App;
