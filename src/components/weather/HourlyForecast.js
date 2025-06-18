import Card from '../ui/Card.js';
import { Clock } from 'lucide-react';

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData) return null;

  const currentHour = new Date().getHours();

  // Move the "Now" hour to the front
  let nowIndex = hourlyData.findIndex(
    (hour) => new Date(hour.time).getHours() === currentHour
  );
  let sortedData = [...hourlyData];
  if (nowIndex > 0) {
    const [nowHour] = sortedData.splice(nowIndex, 1);
    sortedData.unshift(nowHour);
  }

  return (
    <Card className="bg-white/60 backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-extrabold text-blue-900 mb-6 flex items-center gap-2 tracking-tight">
        <span className="bg-gradient-to-br from-indigo-400 to-blue-400 p-2 rounded-lg shadow-md">
          <Clock className="text-white h-6 w-6" />
        </span>
        Hourly Forecast
      </h3>
      <div className="flex overflow-x-auto space-x-6 pb-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        {sortedData.map((hour, idx) => {
          const hourNum = new Date(hour.time).getHours();
          const isNow = hourNum === currentHour;
          return (
            <div
              key={idx}
              className={`
                flex-shrink-0 text-center min-w-[110px] px-4 py-5 rounded-2xl border
                relative transition-all duration-300
                ${isNow
                  ? 'bg-gradient-to-br from-indigo-400/90 via-blue-400/90 to-sky-300/80 border-2 border-indigo-400 shadow-xl animate-pulse'
                  : 'bg-white/40 border-blue-100 hover:scale-105 hover:shadow-lg'
                }
              `}
              style={{
                boxShadow: isNow
                  ? '0 0 0 4px rgba(99,102,241,0.15), 0 8px 32px 0 rgba(31,38,135,0.15)'
                  : undefined,
              }}
            >
              <p className={`text-xs font-bold mb-1 ${isNow ? 'text-white' : 'text-blue-900'}`}>
                {isNow ? (
                  <>
                    Now
                    <span className="block text-[11px] font-normal opacity-80">
                      {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </>
                ) : (
                  new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                )}
              </p>
              <img
                src={hour.icon}
                alt="weather icon"
                className={`w-12 h-12 mx-auto mb-1 ${isNow ? 'drop-shadow-lg' : ''}`}
                draggable={false}
              />
              <p className={`text-xl font-extrabold ${isNow ? 'text-white' : 'text-blue-900'}`}>
                {Math.round(hour.temp)}°C
              </p>
              <p className={`text-xs mt-1 ${isNow ? 'text-blue-50' : 'text-blue-700/80'}`}>
                {hour.condition || ''}
              </p>
              {isNow && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow font-bold animate-bounce">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default HourlyForecast;