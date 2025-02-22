import { useEffect, useState } from "react";
import "./App.css";

//key for the storage
export const STORAGE_KEY = "i_counter";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //initialize the counter
    chrome.storage.sync.get([STORAGE_KEY]).then((result) => {
      let data = result[STORAGE_KEY];

      if (data && typeof data === "number") {
        setCount(data);
      }
    });

    //add listener
    chrome.storage.session.onChanged.addListener((changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.hasOwnProperty(STORAGE_KEY)) {
        setCount(changes[STORAGE_KEY].newValue);
      }
    });
  }, []);

  const reset = () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      chrome.storage.sync.set({ [STORAGE_KEY]: 0 });
      setCount(0);
    }
  };

  return (
    <div className="app">
      <h3># of ゐ you found: {count}</h3>
      {count === 0 ? <div>ゐ is no longer used???</div> : <div>ゐ is actually still used!</div>}
      <button onClick={reset}>RESET</button>
    </div>
  );
}

export default App;
