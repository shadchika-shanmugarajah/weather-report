import { CloudSun, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

const WeatherHeader = ({ lastUpdated, onRefresh }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
              <CloudSun className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Weather Reporter
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <div className="flex items-center space-x-2 text-sm text-slate-600 bg-blue-50 px-3 py-2 rounded-lg">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <span>Updated: {formatTime(lastUpdated)}</span>
              </div>
            )}
            {onRefresh && (
              <Button
                variant="outline" 
                size="sm"
                onClick={onRefresh}
                className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
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