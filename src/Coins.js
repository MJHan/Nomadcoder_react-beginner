import { useEffect, useState } from "react";

function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState(0);
  const [cash, setCash] = useState(0);
  const [result, setResult] = useState({});

  const onChange = (event) => {
    event.preventDefault();
    setCash(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setResult((current) => ({
      name: current.name,
      value: Number(cash) / Number(coin),
    }));
  };

  const onChangeList = (event) => {
    event.preventDefault();
    setCoin(event.target.value.match("[0-9]+.[0-9]+"));
    setResult({
      name: event.target.value.match("\\((.*?)\\)")[0],
      value: Number(cash) / Number(coin),
    });
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setResult({
          name: `(${json[0].symbol})`,
          value: 0,
        });
        setCoin(json[0].quotes.USD.price);
      });
  }, []);
  useEffect(() => {
    setResult((current) => ({
      name: current.name,
      value: Number(cash) / Number(coin),
    }));
    console.log("Cacluate");
  }, [coin, cash]);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={cash}
          type="number"
          placeholder="Enter USD to change"
          required
        ></input>
        USD
        <button>Convert</button>
      </form>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeList}>
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <h3>
        {result.value} {result.name}
      </h3>
    </div>
  );
}

export default Coins;
