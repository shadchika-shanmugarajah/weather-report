import Card, { CardContent } from '../ui/Card.js';
import { Droplets, Wind, Sun, Gauge, TrendingUp, Thermometer } from 'lucide-react';

const WeatherMetrics = ({ weather }) => {
  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-500', advice: 'Enjoy the sun!' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-500', advice: 'Wear sunglasses.' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-500', advice: 'Use sunscreen!' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-500', advice: 'Limit sun exposure!' };
    return { level: 'Extreme', color: 'text-purple-500', advice: 'Stay indoors if possible!' };
  };

  const getHumidityAdvice = (humidity) => {
    if (humidity < 30) return 'Air is dry. Stay hydrated!';
    if (humidity > 70) return 'High humidity. Carry an umbrella!';
    return 'Comfortable humidity.';
  };

  const getWindAdvice = (windSpeed) => {
    if (windSpeed < 10) return 'Calm winds.';
    if (windSpeed < 25) return 'Breezy. Hold onto your hat!';
    return 'Strong winds. Be cautious!';
  };

  const getPressureAdvice = (pressure) => {
    if (pressure > 1013) return 'High pressure. Usually fair weather.';
    if (pressure < 1000) return 'Low pressure. Possible rain.';
    return 'Normal pressure.';
  };

  const uvInfo = getUVLevel(weather.uvIndex);

  const metrics = [
    {
      title: 'Humidity & Feels Like',
      value: `${weather.humidity}%`,
      description: `Feels like: ${weather.feelsLike ? `${weather.feelsLike}°C` : 'N/A'}`,
      icon: Thermometer,
      gradient: 'from-blue-400 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      progressValue: weather.humidity,
      progressColor: 'from-blue-400 to-cyan-500',
      advice: getHumidityAdvice(weather.humidity),
    },
    {
      title: 'Wind Speed',
      value: `${Math.round(weather.windSpeed)} km/h`,
      description: weather.windDirection,
      icon: Wind,
      gradient: 'from-emerald-400 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      progressValue: Math.min(weather.windSpeed * 2, 100),
      progressColor: 'from-emerald-400 to-teal-500',
      advice: getWindAdvice(weather.windSpeed),
    },
    {
      title: 'UV Index',
      value: weather.uvIndex.toString(),
      description: uvInfo.level,
      icon: Sun,
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      progressValue: Math.min(weather.uvIndex * 10, 100),
      progressColor: 'from-yellow-400 to-orange-500',
      advice: uvInfo.advice,
    },
    {
      title: 'Pressure',
      value: `${Math.round(weather.pressure)} hPa`,
      description: weather.pressure > 1013 ? 'High' : weather.pressure < 1000 ? 'Low' : 'Normal',
      icon: Gauge,
      gradient: 'from-purple-400 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      progressValue: Math.min(((weather.pressure - 950) / 100) * 100, 100),
      progressColor: 'from-purple-400 to-indigo-500',
      advice: getPressureAdvice(weather.pressure),
    }
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-2 rounded-lg shadow-md mr-3">
            <TrendingUp className="text-white h-5 w-5" />
          </div>
          Weather Metrics
        </h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div 
                  key={index}
                  className={`flex-shrink-0 text-center p-4 bg-gradient-to-br ${metric.bgColor} hover:shadow-md rounded-xl border border-blue-100 transition-all duration-300 hover:-translate-y-1 min-w-[170px]`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className={`bg-gradient-to-br ${metric.gradient} p-2 rounded-lg shadow-md`}>
                      <IconComponent className="text-white h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</p>
                  <p className="text-xs text-slate-600 font-medium mb-1">{metric.description}</p>
                  <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden mb-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${metric.progressColor} rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${metric.progressValue}%` }}
                    />
                  </div>
                  <p className="text-xs font-semibold mt-1 text-indigo-600">{metric.advice}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMetrics;