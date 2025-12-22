// src/components/analytics/StatsCard.jsx
import { TrendingUp, Users, Clock, Heart, MessageCircle } from 'lucide-react';

const StatsCard = ({ title, value, change, trend = 'up', color = 'blue' }) => {
  const Icon = trend === 'up' ? TrendingUp : Users;
  
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-dark1 rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/10 border border-${color}-500/30`}>
          <Icon className={`w-6 h-6 ${getTrendColor()}`} />
        </div>
        <span className={`text-sm font-medium ${getTrendColor()}`}>
          {trend === 'up' ? `+${change}%` : `${change}%`}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-gray1 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
