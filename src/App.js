import { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchageRate, setExchageRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = Math.round((amount * exchageRate)*10000)/10000;
  } else {
    toAmount = amount;
    fromAmount = Math.round((amount / exchageRate)*10000)/10000 ;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency  = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchageRate(data.rates[firstCurrency]);
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchageRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChane(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChane(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChane}
      />
      {amountInFromCurrency ? (
        <h1>&#x02965;</h1>
      ) : (
        <h1>&#x02963;</h1>
      )}
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChane}
      />
      {amountInFromCurrency ? (
        <div>1 {fromCurrency} is equal to {exchageRate} of {toCurrency}</div>
      ) : (
        <div>1 {toCurrency} is equal to {Math.round((1/exchageRate)*10000)/10000} of {fromCurrency}</div>
      )}
    </>
  );
}

export default App;
