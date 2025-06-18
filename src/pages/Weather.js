import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WeatherHeader from '../components/weather/WeatherHeader.js';
import LocationHeader from '../components/weather/LocationHeader.js';
import LocationSearch from '../components/weather/LocationSearch.js';
import WeatherMetrics from '../components/weather/WeatherMetrics.js';
import HourlyForecast from '../components/weather/HourlyForecast.js';
import TemperatureChart from '../components/weather/TemperatureChart.js';
import WeatherAlerts from '../components/weather/WeatherAlerts.js';
import WeatherFooter from '../components/weather/WeatherFooter.js';
import Button from '../components/ui/Button.js';
import Card from '../components/ui/Card.js';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function Weather() {
  const [selectedLocation, setSelectedLocation] = useState('Colombo,Sri Lanka');
  const [localRefreshTime, setLocalRefreshTime] = useState(null);

  const { 
    data: currentWeather, 
    isLoading: isLoadingCurrent, 
    error: currentError,
    refetch: refetchCurrent 
  } = useQuery({
    queryKey: ['weather', selectedLocation],
    queryFn: async ({ queryKey }) => {
      const [, location] = queryKey;
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return {
        location: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        windDirection: data.current.wind_dir,
        pressure: data.current.pressure_mb,
        visibility: data.current.vis_km,
        uvIndex: data.current.uv,
        lastUpdated: data.current.last_updated,
      };
    },
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });

  const { 
    data: hourlyData, 
    isLoading: isLoadingHourly, 
    error: hourlyError,
    refetch: refetchHourly 
  } = useQuery({
    queryKey: ['forecast', selectedLocation],
    queryFn: async ({ queryKey }) => {
      const [, location] = queryKey;
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&hours=24`);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const data = await response.json();
      return data.forecast.forecastday[0].hour.map(hour => ({
        time: hour.time,
        temp: hour.temp_c,
        icon: hour.condition.icon,
        condition: hour.condition.text,
      }));
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
    setLocalRefreshTime(new Date());
  };

  // Use localRefreshTime if available, otherwise use API lastUpdated
  const lastUpdatedDisplay = localRefreshTime
    ? localRefreshTime.toISOString()
    : currentWeather?.lastUpdated;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50 flex flex-col">
      <WeatherHeader lastUpdated={lastUpdatedDisplay} onRefresh={handleRefresh} />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 space-y-6 w-full">
        {isLoading ? (
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
        ) : hasError ? (
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
        ) : !currentWeather ? (
          <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-8 text-center">
            <div className="pt-6">
              <div className="bg-gradient-to-br from-gray-400 to-slate-500 p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <AlertCircle className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Weather Data Available</h3>
              <p className="text-slate-600">Please try refreshing the page</p>
            </div>
          </Card>
        ) : (
          <>
            <LocationSearch onLocationSelect={handleLocationSelect} isLoading={isLoading} />
            <LocationHeader weather={currentWeather} />
            <WeatherMetrics weather={currentWeather} />
            {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
            {hourlyData && <TemperatureChart hourlyData={hourlyData} />}
            <WeatherAlerts weather={currentWeather} />
          </>
        )}
      </main>
      <WeatherFooter lastUpdated={lastUpdatedDisplay} onRefresh={handleRefresh} isLoading={isLoading} />
    </div>
  );
}