import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import AxiosInstance from "../utils/AxiosInstance";
import { format, formatDistanceToNow } from "date-fns";
import {
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  Users,
  Clock,
  ArrowUp,
  ArrowDown,
  Zap,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PostAnalytics({ postId, postTitle }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [isDark, setIsDark] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: format(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    ),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  // Watch for dark mode
  useEffect(() => {
    const initialDark = document.documentElement.classList.contains("dark");
    setIsDark(initialDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") {
          const hasDark = document.documentElement.classList.contains("dark");
          setIsDark(hasDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const fetchPostAnalytics = async () => {
    if (!postId) {
      console.warn("No postId provided");
      return;
    }

    try {
      setLoading(true);
      const response = await AxiosInstance.get(`/analytics/posts/${postId}`, {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
        headers: {
          authorization: token,
        },
      });

      const payload = response.data?.data || {};

      setStats({
        stats: payload.stats || {},
        viewsOverTime: payload.viewsOverTime || [],
        geoBreakdown: payload.geoBreakdown || [],
        dateRange: payload.dateRange || dateRange,
      });
    } catch (error) {
      console.error("Post analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && postId) {
      fetchPostAnalytics();
    }
  }, [postId, token, dateRange]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            Loading post analytics...
          </p>
        </div>
      </div>
    );
  }

  const postStats = stats.stats || {};
  const viewsOverTime = stats.viewsOverTime || [];
  const geoBreakdown = stats.geoBreakdown || [];

  const chartColors = [
    "#f97316",
    "#fb923c",
    "#fbbf24",
    "#fca5a5",
    "#f472b6",
    "#c084fc",
    "#60a5fa",
    "#34d399",
  ];

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
            Post Analytics
          </p>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
            {postTitle || "Post Performance"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Detailed insights for this post
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="px-3 py-2 rounded-2xl text-xs bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
          />
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="px-3 py-2 rounded-2xl text-xs bg-white/80 dark:bg-black/40 border border-orange-100 dark:border-white/15 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-orange-400/70"
          />
        </div>
      </div>

      {/* KEY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Views */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Total Views
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(postStats.totalViews || 0).toLocaleString()}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Page views
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Unique Visitors
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(postStats.uniqueVisitors || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Individual users
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-green-500/20 text-green-600 dark:text-green-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Avg Time */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Avg Time
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {Math.round(postStats.avgTimeSpent || 0)}s
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {Math.round(postStats.avgScrollDepth || 0)}% scroll depth
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Engagement Score */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Engagement
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(
                  ((postStats.totalLikes || 0) +
                    (postStats.totalComments || 0)) /
                  Math.max((postStats.totalViews || 0), 1)
                ).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Per view
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-600 dark:text-orange-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Likes */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Total Likes
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(postStats.totalLikes || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {(
                  ((postStats.totalLikes || 0) / Math.max((postStats.totalViews || 0), 1)) *
                  100
                ).toFixed(1)}
                % of views
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-600 dark:text-pink-400">
              <Heart className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Total Comments
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(postStats.totalComments || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {(
                  ((postStats.totalComments || 0) / Math.max((postStats.totalViews || 0), 1)) *
                  100
                ).toFixed(1)}
                % of views
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* VIEWS OVER TIME */}
      {viewsOverTime.length > 0 && (
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
                Traffic Trend
              </p>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Views Over Time
              </h3>
            </div>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsOverTime}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis
                dataKey="_id"
                stroke={isDark ? "#9ca3af" : "#6b7280"}
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "12px",
                  color: isDark ? "#f3f4f6" : "#111827",
                }}
                formatter={(value) => [value, "Views"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: "#f97316", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* GEOGRAPHIC BREAKDOWN */}
      {geoBreakdown.length > 0 && (
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
                Geographic
              </p>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Top Countries
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-500 dark:text-gray-400 font-medium">
                    Country
                  </th>
                  <th className="text-right py-3 text-gray-500 dark:text-gray-400 font-medium">
                    Views
                  </th>
                  <th className="text-right py-3 text-gray-500 dark:text-gray-400 font-medium">
                    Avg Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {geoBreakdown.slice(0, 8).map((country, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-900/50"
                  >
                    <td className="py-3 font-medium text-white">
                      {country._id}
                    </td>
                    <td className="text-right py-3 text-white">
                      {country.views}
                    </td>
                    <td className="text-right py-3 text-gray-400">
                      {country.avgTimeSpent}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BOUNCE RATE */}
      {postStats.bounceRate !== undefined && (
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Bounce Rate
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {Math.round(postStats.bounceRate || 0)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Users who left without interaction
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-red-500/20 text-red-600 dark:text-red-400">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
