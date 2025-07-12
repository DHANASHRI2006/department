import React from 'react';

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({ 
  data, 
  width = 400, 
  height = 200 
}) => {
  const maxValue = Math.max(...data.map(d => Math.max(...Object.values(d).filter(v => typeof v === 'number') as number[])));
  const barWidth = width / data.length - 10;
  
  return (
    <div className="w-full h-48 flex items-end justify-center space-x-2 p-4">
      {data.map((item, index) => {
        const value = typeof item.users === 'number' ? item.users : 0;
        const barHeight = (value / maxValue) * (height - 40);
        
        return (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {value}
            </div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-1000 ease-out hover:from-blue-600 hover:to-blue-500"
              style={{
                width: `${barWidth}px`,
                height: `${barHeight}px`,
                minHeight: '4px'
              }}
            />
            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};