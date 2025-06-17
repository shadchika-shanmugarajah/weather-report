import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WeatherHeader from '../components/weather/WeatherHeader';
import LocationHeader from '../components/weather/LocationHeader';
import LocationSearch from '../components/weather/LocationSearch';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherMetrics from '../components/weather/WeatherMetrics';
import HourlyForecast from '../components/weather/HourlyForecast';
import TemperatureChart from '../components/weather/TemperatureChart';
import WeatherAlerts from '../components/weather/WeatherAlerts';
import WeatherFooter from '../components/weather/WeatherFooter';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function Weather() {
  const [selectedLocation, setSelectedLocation] = useState('Colombo,Sri Lanka');

  const { 
    data: currentWeather, 
    isLoading: isLoadingCurrent, 
    error: currentError,
    refetch: refetchCurrent 
  } = useQuery({
    queryKey: ['/api/weather/current', selectedLocation],
    queryFn: async ({ queryKey }) => {
      const [, location] = queryKey;
      const response = await fetch(`/api/weather/current?location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      return response.json();
    },
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });

  const { 
    data: hourlyData, 
    isLoading: isLoadingHourly, 
    error: hourlyError,
    refetch: refetchHourly 
  } = useQuery({
    queryKey: ['/api/weather/hourly', selectedLocation],
    queryFn: async ({ queryKey }) => {
      const [, location] = queryKey;
      const response = await fetch(`/api/weather/hourly?location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch hourly data: ${response.statusText}`);
      }
      return response.json();
    },
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  const isLoading = isLoadingCurrent || isLoadingHourly;
  const hasError = currentError || hourlyError;

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleRefresh = async () => {
    await refetchCurrent();
    await refetchHourly();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
        <WeatherHeader />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-8 text-center">
            <div className="pt-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <Loader2 className="h-16 w-16 animate-spin text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Weather Data</h3>
              <p className="text-slate-600">Fetching the latest conditions for Colombo...</p>
              <div className="flex justify-center mt-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
        <WeatherHeader />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <Card className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-xl p-8 text-center">
            <div className="pt-6">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <AlertCircle className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-3">Unable to Load Weather Data</h3>
              <p className="text-red-600 text-lg leading-relaxed mb-6 max-w-md mx-auto">
                {currentError?.message || hourlyError?.message || "Please check your internet connection and try again."}
              </p>
              <Button 
                onClick={handleRefresh} 
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
        <WeatherHeader />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-8 text-center">
            <div className="pt-6">
              <div className="bg-gradient-to-br from-gray-400 to-slate-500 p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <AlertCircle className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Weather Data Available</h3>
              <p className="text-slate-600">Please try refreshing the page</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <WeatherHeader lastUpdated={currentWeather.lastUpdated} onRefresh={handleRefresh} />
      
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <LocationSearch onLocationSelect={handleLocationSelect} isLoading={isLoading} />
        <LocationHeader weather={currentWeather} />
        <CurrentWeather weather={currentWeather} />
        <WeatherMetrics weather={currentWeather} />
        {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
        {hourlyData && <TemperatureChart hourlyData={hourlyData} />}
        <WeatherAlerts weather={currentWeather} />
      </main>

      <WeatherFooter lastUpdated={currentWeather.lastUpdated} onRefresh={handleRefresh} />
    </div>
  );
}