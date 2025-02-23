import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time } from 'lightweight-charts';
import { StockData } from '../types';

interface ChartProps {
  data: StockData;
  symbol: string;
}

const Chart = ({ data, symbol }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    
    // For intraday data (when hours and minutes matter)
    if (date.getHours() !== 0 || date.getMinutes() !== 0) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    
    // For daily data
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        });
      }
    };

    // Create chart with dark theme
    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#1f2937' }, // bg-gray-800
        textColor: '#9ca3af', // text-gray-400
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: '#374151' }, // bg-gray-700
        horzLines: { color: '#374151' }, // bg-gray-700
      },
      timeScale: {
        borderColor: '#4b5563', // border-gray-600
        timeVisible: true,
        borderVisible: true,
        tickMarkFormatter: (time: Time) => {
          const timestamp = time as number;
          return formatDate(timestamp);
        },
      },
      rightPriceScale: {
        borderColor: '#4b5563', // border-gray-600
        borderVisible: true,
        formatter: formatPrice,
      },
      crosshair: {
        vertLine: {
          color: '#60a5fa', // blue-400
          width: 1,
          labelBackgroundColor: '#2563eb', // blue-600
        },
        horzLine: {
          color: '#60a5fa', // blue-400
          width: 1,
          labelBackgroundColor: '#2563eb', // blue-600
        },
      },
    });

    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: '#34d399', // green-400
      downColor: '#f87171', // red-400
      borderVisible: false,
      wickUpColor: '#34d399', // green-400
      wickDownColor: '#f87171', // red-400
    });

    // Prepare and set the candlestick data
    const chartData = data.timestamp.map((time, index) => ({
      time: time,
      open: data.open[index],
      high: data.high[index],
      low: data.low[index],
      close: data.close[index]
    }));

    candlestickSeries.setData(chartData);

    // Fit the content and add some padding
    chartRef.current.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-blue-400">{symbol} Price Chart</h2>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export default Chart;