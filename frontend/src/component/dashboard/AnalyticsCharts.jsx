// src/components/dashboard/AnalyticsCharts.jsx
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];

const AnalyticsCharts = ({
  trafficBreakdown = [],
  deviceBreakdown = [],
  browserBreakdown = [],
  topCountries = [],
  topPosts = [],
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Traffic Sources Pie Chart */}
      <div className="bg-dark1 rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={trafficBreakdown.slice(0, 6)}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {trafficBreakdown.slice(0, 6).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Device Breakdown Bar Chart */}
      <div className="bg-dark1 rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-6">Device Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deviceBreakdown}>
            <XAxis dataKey="_id" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Countries */}
      <div className="bg-dark1 rounded-xl p-6 border border-gray-800 lg:col-span-2">
        <h3 className="text-xl font-semibold text-white mb-6">Top Countries</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray1 font-medium">Country</th>
                <th className="text-right py-3 text-gray1 font-medium">Visitors</th>
                <th className="text-right py-3 text-gray1 font-medium">Page Views</th>
                <th className="text-right py-3 text-gray1 font-medium">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.slice(0, 8).map((country, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="py-3 font-medium text-white">{country.country}</td>
                  <td className="text-right py-3 text-white">{country.visitors}</td>
                  <td className="text-right py-3 text-white">{country.pageViews}</td>
                  <td className="text-right py-3 text-gray1">{country.avgTimeSpent}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Posts Table */}
      <div className="bg-dark1 rounded-xl p-6 border border-gray-800 lg:col-span-3">
        <h3 className="text-xl font-semibold text-white mb-6">Top Posts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray1 font-medium">Post Title</th>
                <th className="text-right py-3 text-gray1 font-medium">Views</th>
                <th className="text-right py-3 text-gray1 font-medium">Visitors</th>
                <th className="text-right py-3 text-gray1 font-medium">Avg Time</th>
                <th className="text-right py-3 text-gray1 font-medium">Likes</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.slice(0, 5).map((post, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="py-3">
                    <div>
                      <p className="font-medium text-white line-clamp-1 max-w-xs">{post.postTitle}</p>
                      <p className="text-xs text-gray1">ID: {post.postId?.slice(-8)}</p>
                    </div>
                  </td>
                  <td className="text-right py-3 text-white font-medium">{post.views}</td>
                  <td className="text-right py-3 text-white">{post.uniqueVisitors}</td>
                  <td className="text-right py-3 text-gray1">{post.avgTimeSpent}s</td>
                  <td className="text-right py-3">
                    <span className="text-pink-400 font-medium">{post.likes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
