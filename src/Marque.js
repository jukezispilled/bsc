import { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";

const Marque = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const exchangeRate = 7.1; // Approximate USD to CNY exchange rate

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin,bitcoin,bnb,ethereum,solana,xrp,cardano,avalanche-2,tron&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        let data = await response.json();

        // Reorder to make BNB first
        const bnbIndex = data.findIndex(crypto => crypto.id === 'binancecoin');
        if (bnbIndex !== -1) {
          const bnb = data[bnbIndex];
          data = [bnb, ...data.filter(crypto => crypto.id !== 'binancecoin')];
        }

        setCryptoData(data);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const formatPriceChange = (priceChange) => {
    const isPositive = priceChange >= 0;
    return (
      <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} font-bold`}>
        {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="w-full bg-black py-2 border-b-2 border-yellow-400 fixed top-0 left-0 z-20">
      {loading ? (
        <div className="text-yellow-400 font-custom text-center">Loading prices...</div>
      ) : error ? (
        <div className="text-red-500 font-custom text-center">{error}</div>
      ) : (
        <Marquee gradient={false} speed={70} className="overflow-hidden">
          <div className="flex space-x-8 px-4">
            {[...cryptoData, ...cryptoData].map((crypto, index) => (
              <div key={crypto.id + index} className="flex items-center space-x-2 text-yellow-400 font-custom">
                <img 
                  src={crypto.image} 
                  alt={crypto.name} 
                  className="w-5 h-5 rounded-full" 
                />
                <span className="uppercase font-bold">{crypto.symbol}</span>
                <span>
                  ${crypto.current_price.toLocaleString()} / ¥{(crypto.current_price * exchangeRate).toLocaleString()}
                </span>
                {formatPriceChange(crypto.price_change_percentage_24h)}
              </div>
            ))}
          </div>
        </Marquee>
      )}
    </div>
  );
};

export default Marque;