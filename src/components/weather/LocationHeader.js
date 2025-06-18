import { MapPin, Thermometer, Droplets, Wind, Sun, Clock } from 'lucide-react';

// Helper to pick emoji based on weather condition
function getWeatherEmoji(condition) {
  const c = condition.toLowerCase();
  if (c.includes('sun') || c.includes('clear')) return '☀️';
  if (c.includes('cloud')) return '⛅';
  if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
  if (c.includes('thunder')) return '⛈️';
  if (c.includes('snow')) return '❄️';
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return '🌫️';
  return '🌡️';
}

export default function LocationHeader({ weather }) {
  if (!weather) return null;

  const emoji = getWeatherEmoji(weather.condition);

  return (
    <div className="relative mx-auto w-full max-w-5xl min-h-[340px] bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 rounded-3xl shadow-2xl p-10 mb-12 overflow-hidden flex flex-col justify-between">
      {/* Decorative blurred circles */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
      <div className="flex items-center gap-6 mb-10 z-10">
        <div className="bg-white/40 p-6 rounded-full shadow-xl backdrop-blur-lg">
          <MapPin className="h-14 w-14 text-blue-900" />
        </div>
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight flex items-center gap-4">
            {weather.location}
            <span
              className="text-5xl md:text-6xl animate-bounce"
              title={weather.condition}
              aria-label={weather.condition}
            >
              {emoji}
            </span>
          </h2>
          <p className="text-2xl text-blue-100 font-semibold mt-2 flex items-center gap-2">
            {weather.country}
            <span className="text-lg font-normal text-blue-200">
              ({weather.condition})
            </span>
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white z-10">
        <div className="flex flex-col items-center bg-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
          <Thermometer className="h-9 w-9 mb-2 text-orange-200" />
          <span className="font-bold text-2xl">{weather.temperature}°C</span>
          <span className="text-sm text-blue-100">Temperature</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
          <Droplets className="h-9 w-9 mb-2 text-cyan-200" />
          <span className="font-bold text-2xl">{weather.humidity}%</span>
          <span className="text-sm text-blue-100">Humidity</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
          <Wind className="h-9 w-9 mb-2 text-slate-200" />
          <span className="font-bold text-2xl">{weather.windSpeed} kph</span>
          <span className="text-sm text-blue-100">Wind</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-2xl p-6 shadow-lg backdrop-blur-md">
          <Sun className="h-9 w-9 mb-2 text-yellow-200" />
          <span className="font-bold text-2xl">{weather.uvIndex}</span>
          <span className="text-sm text-blue-100">UV Index</span>
        </div>
      </div>

      {/* Highlighted last update */}
      <div className="absolute top-8 right-8 z-20">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 text-blue-900 font-semibold shadow-lg border border-blue-200 text-base backdrop-blur-md">
          <Clock className="h-5 w-5 text-blue-500" />
          Last updated:&nbsp;
          <span className="font-bold">{weather.lastUpdated}</span>
        </span>
      </div>
    </div>
  );
}