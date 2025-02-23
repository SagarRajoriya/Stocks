export interface StockData {
  timestamp: number[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

export interface CompanyDetails {
  symbol: string;
  currentPrice: number;
  dayHigh: number;
  dayLow: number;
  openPrice: number;
  volume: number;
}

export interface TimeRange {
  range: string;
  interval: string;
  description: string;
}

export const TIME_RANGES: TimeRange[] = [
  { range: '1d', interval: '5m', description: '1 Day' },
  { range: '1mo', interval: '1d', description: '1 Month' },
  { range: '6mo', interval: '1d', description: '6 Months' },
  { range: '1y', interval: '1d', description: '1 Year' },
  { range: '5y', interval: '1wk', description: '5 Years' }
];

export const COMPANY_LIST = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META',
  'TSLA', 'NVDA', 'JPM', 'V', 'WMT'
];