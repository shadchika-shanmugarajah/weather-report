import { CloudSun, RefreshCw } from 'lucide-react';
import Button from '../ui/Button.js';

const WeatherHeader = ({ lastUpdated, onRefresh }) => {
  const formatTime = (date) => {
    if (!date) return '';
    // Accepts ISO string or API time string
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <header className="bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-400/90 backdrop-blur-md shadow-lg border-b border-blue-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <CloudSun className="text-white h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow">
              Weather Reporter
            </h1>
          </div>
          {/* Right: Last updated and Refresh */}
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <div className="flex items-center space-x-2 text-sm text-blue-900 bg-white/70 px-3 py-2 rounded-lg shadow">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <span>Updated: {formatTime(lastUpdated)}</span>
              </div>
            )}
            {onRefresh && (
              <Button
                variant="outline" 
                size="sm"
                onClick={onRefresh}
                className="bg-white/80 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-900 active:bg-blue-200 active:text-blue-900 focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default WeatherHeader;