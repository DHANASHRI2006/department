import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Download, 
  RefreshCw, 
  Database, 
  Server, 
  Code,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Copy
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  status: 'active' | 'inactive' | 'testing';
  responseTime: number;
  lastTested: string;
}

interface ApiResponse {
  status: number;
  data: any;
  headers: Record<string, string>;
  responseTime: number;
}

export const ApiDemo: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');
  const [requestBody, setRequestBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer token"\n}');

  const endpoints: ApiEndpoint[] = [
    {
      id: '1',
      method: 'GET',
      path: '/api/users',
      description: 'Get all users',
      status: 'active',
      responseTime: 145,
      lastTested: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      method: 'POST',
      path: '/api/users',
      description: 'Create a new user',
      status: 'active',
      responseTime: 230,
      lastTested: '2024-01-15T10:25:00Z'
    },
    {
      id: '3',
      method: 'GET',
      path: '/api/users/:id',
      description: 'Get user by ID',
      status: 'active',
      responseTime: 95,
      lastTested: '2024-01-15T10:20:00Z'
    },
    {
      id: '4',
      method: 'PUT',
      path: '/api/users/:id',
      description: 'Update user',
      status: 'testing',
      responseTime: 180,
      lastTested: '2024-01-15T10:15:00Z'
    },
    {
      id: '5',
      method: 'DELETE',
      path: '/api/users/:id',
      description: 'Delete user',
      status: 'inactive',
      responseTime: 120,
      lastTested: '2024-01-15T10:10:00Z'
    },
    {
      id: '6',
      method: 'GET',
      path: '/api/tasks',
      description: 'Get all tasks',
      status: 'active',
      responseTime: 160,
      lastTested: '2024-01-15T10:05:00Z'
    }
  ];

  const handleSendRequest = async () => {
    const endpoint = endpoints.find(e => e.id === selectedEndpoint);
    if (!endpoint) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse: ApiResponse = {
        status: endpoint.method === 'DELETE' ? 204 : 200,
        data: endpoint.method === 'GET' ? 
          (endpoint.path.includes(':id') ? 
            { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() } :
            [
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ]) :
          endpoint.method === 'POST' ?
            { id: 3, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() } :
          endpoint.method === 'PUT' ?
            { id: 1, name: 'John Doe Updated', email: 'john.updated@example.com', updatedAt: new Date().toISOString() } :
            null,
        headers: {
          'Content-Type': 'application/json',
          'X-Response-Time': `${Math.floor(Math.random() * 200 + 50)}ms`,
          'Server': 'Express/4.18.0'
        },
        responseTime: Math.floor(Math.random() * 200 + 50)
      };
      
      setResponse(mockResponse);
      setIsLoading(false);
    }, 1000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400';
      case 'testing':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'inactive':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'testing':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportResponse = () => {
    if (!response) return;
    
    const dataStr = JSON.stringify(response, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'api-response.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            API Testing Interface
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Test and explore API endpoints with real-time responses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoints List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
              <Server className="w-5 h-5 mr-2" />
              API Endpoints
            </h3>
            <div className="space-y-3">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.id}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedEndpoint === endpoint.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <div className={`flex items-center space-x-1 ${getStatusColor(endpoint.status)}`}>
                      {getStatusIcon(endpoint.status)}
                      <span className="text-xs capitalize">{endpoint.status}</span>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-slate-900 dark:text-white mb-1">
                    {endpoint.path}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {endpoint.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{endpoint.responseTime}ms avg</span>
                    <span>{new Date(endpoint.lastTested).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Request Configuration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Request Configuration
            </h3>
            
            {selectedEndpoint ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Headers
                  </label>
                  <div className="relative">
                    <textarea
                      value={headers}
                      onChange={(e) => setHeaders(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => copyToClipboard(headers)}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {['POST', 'PUT'].includes(endpoints.find(e => e.id === selectedEndpoint)?.method || '') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Request Body
                    </label>
                    <div className="relative">
                      <textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => copyToClipboard(requestBody)}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSendRequest}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Request
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Select an endpoint to configure your request
                </p>
              </div>
            )}
          </Card>

          {/* Response */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Response
              </h3>
              {response && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Copy Response"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={exportResponse}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Export Response"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {response ? (
              <div className="space-y-4">
                {/* Status & Timing */}
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      response.status < 300 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      response.status < 400 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {response.status}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {response.responseTime}ms
                    </span>
                  </div>
                </div>

                {/* Headers */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Response Headers
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    <pre className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                      {JSON.stringify(response.headers, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Data */}
                {response.data && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Response Data
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 max-h-64 overflow-auto">
                      <pre className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Send a request to see the response
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* API Documentation */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            API Documentation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Authentication
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                All API requests require authentication via Bearer token in the Authorization header.
              </p>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                Authorization: Bearer your-token-here
              </code>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Rate Limiting
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                API calls are limited to 1000 requests per hour per user.
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>Remaining: 847/1000</div>
                <div>Resets: 34 minutes</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Error Handling
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                API returns standard HTTP status codes with detailed error messages.
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>400: Bad Request</div>
                <div>401: Unauthorized</div>
                <div>404: Not Found</div>
                <div>500: Server Error</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};