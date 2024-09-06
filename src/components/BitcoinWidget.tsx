import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../redux/store';
import { updatePrice, updateTimestamp, updateUSD, updateBTC } from '../redux/priceSlice';
import { formatNumberWithCommas, removeCommas } from '../utils/helper';

const BitcoinWidget = () => {
  const dispatch = useDispatch();
  const { price, lastUpdated, btc } = useSelector((state: RootState) => state.price);
  
  const [usdInput, setUsdInput] = useState('');

  // Fetching Bitcoin price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const currentPrice = response.data.bitcoin.usd;
        dispatch(updatePrice(currentPrice));
        dispatch(updateTimestamp(new Date().toLocaleTimeString()));

        // initial USD value to 1 and calculate BTC
        const initialUSD = 1;
        dispatch(updateUSD(initialUSD));
        dispatch(updateBTC(initialUSD / currentPrice));

        setUsdInput(formatNumberWithCommas(initialUSD.toString()));
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); 
    return () => clearInterval(interval);
  }, [dispatch]);

  
  // USD input Handler
  const handleUSDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    const numericUSD = parseFloat(removeCommas(input));

    if (isNaN(numericUSD) || numericUSD > 100000000) {
      setUsdInput('');
      dispatch(updateUSD(0));
      dispatch(updateBTC(0));
      return;
    }

    dispatch(updateUSD(numericUSD));

    dispatch(updateBTC(numericUSD / (price || 1))); 

    setUsdInput(formatNumberWithCommas(input));
  };

  return (
    <div className="max-w-md p-4 bg-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Bitcoin Price Widget</h2>
      <p>
        <strong>Current Price:</strong> {price ? `$${price.toLocaleString()}` : '--'}
      </p>
      <p>
        <strong>Last Updated:</strong> {lastUpdated || '--'}
      </p>

      <div className="mt-4">
        <label htmlFor="usdInput" className="block font-medium">
          USD Amount (Max $100,000,000):
        </label>
        <input
          id="usdInput"
          type="text"
          value={usdInput}
          onChange={handleUSDChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter USD amount"
          maxLength={13}
        />
      </div>

      <div className="mt-4">
        <p>
          <strong>Converted BTC:</strong> {btc ? btc.toFixed(8) : '--'}
        </p>
      </div>
    </div>
  );
};

export default BitcoinWidget;
