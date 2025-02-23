import { useState, useEffect } from 'react';
import Chart from './components/Chart';
import StockList from './components/StockList';
import CompanyDetails from './components/CompanyDetails';
import { StockData, CompanyDetails as CompanyDetailsType, TIME_RANGES, TimeRange, COMPANY_LIST } from './types';

function App() {
  const [selectedStock, setSelectedStock] = useState('MSFT');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[0]);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (symbol: string, range: string, interval: string) => {
    setLoading(true);
    setError(null);
    try {
      // Use the proxy server instead of direct API call
      const response = await fetch(
        `http://localhost:5000/api/stock/${symbol}?range=${range}&interval=${interval}`
      );
      const data = await response.json();
      
      if (data.chart.error) {
        throw new Error(data.chart.error.description);
      }

      const result = data.chart.result[0];
      const quote = result.indicators.quote[0];
      
      setStockData({
        timestamp: result.timestamp,
        open: quote.open,
        high: quote.high,
        low: quote.low,
        close: quote.close,
        volume: quote.volume
      });

      const lastIndex = quote.close.length - 1;
      setCompanyDetails({
        symbol,
        currentPrice: quote.close[lastIndex],
        dayHigh: Math.max(...quote.high.slice(-1)),
        dayLow: Math.min(...quote.low.slice(-1)),
        openPrice: quote.open[lastIndex],
        volume: quote.volume[lastIndex]
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStock && selectedTimeRange) {
      fetchStockData(selectedStock, selectedTimeRange.range, selectedTimeRange.interval);
    }
  }, [selectedStock, selectedTimeRange]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-400">Stock Market Dashboard</h1>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3">
            <StockList 
              onSelectStock={setSelectedStock} 
              selectedStock={selectedStock}
              stocks={COMPANY_LIST}
            />
          </div>
          
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-gray-800 p-4 rounded-xl shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {TIME_RANGES.map((timeRange) => (
                  <button
                    key={timeRange.range}
                    onClick={() => setSelectedTimeRange(timeRange)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTimeRange.range === timeRange.range
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-102'
                    }`}
                  >
                    {timeRange.description}
                  </button>
                ))}
              </div>
            </div>
            
            {loading && (
              <div className="flex items-center justify-center h-96 bg-gray-800 rounded-xl shadow-xl">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-900/50 p-6 rounded-xl shadow-xl">
                <p className="text-red-400">{error}</p>
              </div>
            )}
            
            {!loading && !error && stockData && (
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                  <Chart data={stockData} symbol={selectedStock} />
                </div>
                {companyDetails && <CompanyDetails details={companyDetails} />}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;