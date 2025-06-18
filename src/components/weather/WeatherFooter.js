import { RefreshCw, Heart, Loader2 } from 'lucide-react';
import Button from '../ui/Button.js';

const WeatherFooter = ({ lastUpdated, onRefresh, isLoading }) => {
  const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100/80 backdrop-blur-md border-t border-blue-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow">
              <p className="text-blue-700 text-sm font-semibold flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-indigo-400" />
                Last updated: <span className="font-bold">{formatDateTime(lastUpdated)}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="bg-gradient-to-br from-blue-200 to-indigo-200 hover:from-blue-300 hover:to-indigo-300 text-blue-800 border border-blue-300 rounded-lg transition-all duration-200 font-semibold flex items-center"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2 text-indigo-500" />
              )}
              Refresh Data
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-200 text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-700 font-medium">
            <span className="text-sm">© {currentYear} Weather Reporter</span>
            <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
            <span className="text-sm">
              Built with <span className="text-indigo-500 font-bold">React</span> & <span className="text-yellow-500 font-bold">JavaScript</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WeatherFooter;