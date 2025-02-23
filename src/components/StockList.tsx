import { useState } from 'react';
import { Search } from 'lucide-react';

interface StockListProps {
  onSelectStock: (symbol: string) => void;
  selectedStock: string;
  stocks: string[];
}

const StockList = ({ onSelectStock, selectedStock, stocks }: StockListProps) => {
  const [search, setSearch] = useState('');

  const filteredStocks = stocks.filter(stock => 
    stock.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Companies</h2>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-gray-700 border-none rounded-lg text-gray-100 
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => onSelectStock(stock)}
            className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              selectedStock === stock
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-102'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {stock}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockList;