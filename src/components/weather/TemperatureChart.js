import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import Card from '../ui/Card.js';
import { Thermometer } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 border border-red-200 rounded-lg px-4 py-2 shadow text-slate-800">
        <div className="font-bold">{label}</div>
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-red-500" />
          <span className="font-semibold">{payload[0].value}°C</span>
        </div>
      </div>
    );
  }
  return null;
};

const TemperatureChart = ({ hourlyData }) => {
  if (!hourlyData) return null;

  // Show only the next 8 hours for a cleaner chart
  const chartData = hourlyData
    .slice(0, 8)
    .map(hour => ({
      time: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: hour.temp,
    }));

  return (
    <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <Thermometer className="h-6 w-6 mr-2 text-red-500" />
        Temperature Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barCategoryGap="30%">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.7}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontWeight: 500 }} />
          <YAxis tick={{ fill: '#64748b', fontWeight: 500 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="temperature"
            fill="url(#barGradient)"
            radius={[10, 10, 0, 0]}
            maxBarSize={28}
          >
            <LabelList
              dataKey="temperature"
              position="top"
              formatter={(value) => `${Math.round(value)}°`}
              style={{ fill: '#ef4444', fontWeight: 700, fontSize: 14 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TemperatureChart;