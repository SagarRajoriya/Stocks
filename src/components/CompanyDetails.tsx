import { CompanyDetails as CompanyDetailsType } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompanyDetailsProps {
  details: CompanyDetailsType;
}

const CompanyDetails = ({ details }: CompanyDetailsProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-400">{details.symbol}</h2>
        <span className="text-3xl font-bold text-gray-100">
          ${details.currentPrice.toFixed(2)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <p className="text-gray-400">Day High</p>
          </div>
          <p className="text-lg font-semibold text-green-400">
            ${details.dayHigh.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-400" />
            <p className="text-gray-400">Day Low</p>
          </div>
          <p className="text-lg font-semibold text-red-400">
            ${details.dayLow.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-gray-400 mb-2">Open Price</p>
          <p className="text-lg font-semibold text-gray-100">
            ${details.openPrice.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg md:col-span-3">
          <p className="text-gray-400 mb-2">Volume</p>
          <p className="text-lg font-semibold text-gray-100">
            {details.volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;