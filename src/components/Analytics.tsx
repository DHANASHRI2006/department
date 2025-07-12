import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Calendar } from 'lucide-react';
import { Card } from './ui/Card';
import { Chart } from './ui/Chart';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([
    { name: 'Mon', users: 400, tasks: 24, revenue: 2400 },
    { name: 'Tue', users: 300, tasks: 18, revenue: 1398 },
    { name: 'Wed', users: 600, tasks: 32, revenue: 3200 },
    { name: 'Thu', users: 800, tasks: 45, revenue: 4500 },
    { name: 'Fri', users: 700, tasks: 38, revenue: 3800 },
    { name: 'Sat', users: 900, tasks: 52, revenue: 5200 },
    { name: 'Sun', users: 1200, tasks: 68, revenue: 6800 }
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Frontend', value: 35, color: '#3B82F6' },
    { name: 'Backend', value: 30, color: '#10B981' },
    { name: 'Database', value: 20, color: '#F59E0B' },
    { name: 'DevOps', value: 15, color: '#EF4444' }
  ]);

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$24,750',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: TrendingDown,
      color: 'red'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Calendar,
      color: 'purple'
    }
  ];

  const performanceData = [
    { metric: 'Page Load Time', value: '1.2s', target: '< 2s', status: 'good' },
    { metric: 'API Response Time', value: '150ms', target: '< 200ms', status: 'good' },
    { metric: 'Error Rate', value: '0.01%', target: '< 1%', status: 'good' },
    { metric: 'Uptime', value: '99.9%', target: '> 99%', status: 'good' },
    { metric: 'Cache Hit Rate', value: '94%', target: '> 90%', status: 'good' },
    { metric: 'Database Queries/s', value: '245', target: '< 1000', status: 'good' }
  ];

  const recentEvents = [
    { id: 1, event: 'New user registration spike', time: '2 hours ago', type: 'info' },
    { id: 2, event: 'API endpoint performance improved', time: '4 hours ago', type: 'success' },
    { id: 3, event: 'High memory usage detected', time: '6 hours ago', type: 'warning' },
    { id: 4, event: 'Database backup completed', time: '8 hours ago', type: 'success' },
    { id: 5, event: 'Security scan passed', time: '12 hours ago', type: 'success' }
  ];

  useEffect(() => {
    // Simulate data updates based on time range
    const updateData = () => {
      if (timeRange === '24h') {
        setChartData([
          { name: '6AM', users: 200, tasks: 12, revenue: 1200 },
          { name: '9AM', users: 450, tasks: 28, revenue: 2800 },
          { name: '12PM', users: 800, tasks: 45, revenue: 4500 },
          { name: '3PM', users: 650, tasks: 38, revenue: 3800 },
          { name: '6PM', users: 900, tasks: 52, revenue: 5200 },
          { name: '9PM', users: 400, tasks: 22, revenue: 2200 },
          { name: '12AM', users: 150, tasks: 8, revenue: 800 }
        ]);
      } else if (timeRange === '30d') {
        setChartData([
          { name: 'Week 1', users: 2800, tasks: 180, revenue: 18000 },
          { name: 'Week 2', users: 3200, tasks: 210, revenue: 21000 },
          { name: 'Week 3', users: 3800, tasks: 245, revenue: 24500 },
          { name: 'Week 4', users: 4200, tasks: 280, revenue: 28000 }
        ]);
      } else {
        // Default 7d data
        setChartData([
          { name: 'Mon', users: 400, tasks: 24, revenue: 2400 },
          { name: 'Tue', users: 300, tasks: 18, revenue: 1398 },
          { name: 'Wed', users: 600, tasks: 32, revenue: 3200 },
          { name: 'Thu', users: 800, tasks: 45, revenue: 4500 },
          { name: 'Fri', users: 700, tasks: 38, revenue: 3800 },
          { name: 'Sat', users: 900, tasks: 52, revenue: 5200 },
          { name: 'Sun', users: 1200, tasks: 68, revenue: 6800 }
        ]);
      }
    };

    updateData();
  }, [timeRange]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Monitor performance and track key metrics
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isPositive = metric.changeType === 'positive';
            return (
              <Card key={metric.title} className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {metric.value}
                    </p>
                    <div className="flex items-center">
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/30`}>
                    <Icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                User Activity Trends
              </h3>
              <BarChart3 className="w-5 h-5 text-slate-500" />
            </div>
            <Chart data={chartData} />
          </Card>

          {/* Pie Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Task Distribution by Category
              </h3>
              <PieChart className="w-5 h-5 text-slate-500" />
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {pieData.map((item, index) => {
                    const total = pieData.reduce((sum, d) => sum + d.value, 0);
                    const percentage = (item.value / total) * 100;
                    const strokeDasharray = `${percentage} ${100 - percentage}`;
                    const rotation = pieData.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
                    
                    return (
                      <circle
                        key={item.name}
                        cx="50"
                        cy="50"
                        r="15.915"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="4"
                        strokeDasharray={strokeDasharray}
                        transform={`rotate(${rotation} 50 50)`}
                        className="transition-all duration-300 hover:stroke-width-6"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {pieData.reduce((sum, d) => sum + d.value, 0)}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Total
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              System Performance
            </h3>
            <div className="space-y-4">
              {performanceData.map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {item.metric}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status === 'good' ? 'Good' : item.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.value}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Target: {item.target}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Events */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Events
            </h3>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    event.type === 'success' ? 'bg-green-500' :
                    event.type === 'warning' ? 'bg-yellow-500' :
                    event.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${getEventTypeColor(event.type)}`}>
                      {event.event}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};