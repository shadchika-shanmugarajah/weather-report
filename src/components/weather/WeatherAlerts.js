import Card from '../ui/Card.js';
import { AlertTriangle } from 'lucide-react';

const WeatherAlerts = ({ weather }) => {
  // This is a placeholder for weather alerts.
  // The free weatherapi.com plan does not include weather alerts.
  // You would need to upgrade to a paid plan to get this data.
  const alerts = weather.alerts || [];

  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-red-50 border-red-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
        <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
        Weather Alerts
      </h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="p-4 bg-red-100 rounded-lg">
            <p className="font-bold text-red-700">{alert.event}</p>
            <p className="text-sm text-red-600">{alert.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeatherAlerts;