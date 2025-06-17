import { RefreshCw, Heart } from 'lucide-react';
import Button from '../ui/Button';

const WeatherFooter = ({ lastUpdated, onRefresh }) => {
  const formatDateTime = (date) => {
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
    <footer className="bg-white/80 backdrop-blur-md border-t border-blue-100 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <p className="text-slate-600 text-sm">Last updated: {formatDateTime(lastUpdated)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-lg transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-100 text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <span className="text-sm">© {currentYear} Weather Reporter</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-sm">Built with React & JavaScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WeatherFooter;