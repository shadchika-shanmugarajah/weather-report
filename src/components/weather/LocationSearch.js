import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardContent } from '../ui/Card';

const LocationSearch = ({ onLocationSelect, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || isLoading) return;

    onLocationSelect(searchQuery.trim());
  };

  const handleQuickLocation = (location) => {
    if (isLoading) return;
    setSearchQuery(location);
    onLocationSelect(location);
  };

  const popularCities = [
    'New York, USA',
    'London, UK', 
    'Tokyo, Japan',
    'Paris, France',
    'Sydney, Australia',
    'Mumbai, India'
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 p-2 rounded-lg shadow-md mr-3">
            <Search className="text-white h-5 w-5" />
          </div>
          Search Location
        </h3>
        
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter city name (e.g., London, UK)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 border-blue-200 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={!searchQuery.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        <div>
          <p className="text-sm text-slate-600 font-medium mb-3">Popular Cities:</p>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => handleQuickLocation(city)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-lg border border-blue-200 transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSearch;