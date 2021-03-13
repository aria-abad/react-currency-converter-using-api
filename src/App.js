import { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setCurrencyOptions([data.base, ...Object.keys(data.rates)]))
  }, [])

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow currencyOptions= {currencyOptions} />
      <h1>&#x0296F;</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
    </>
  );
}

export default App;
