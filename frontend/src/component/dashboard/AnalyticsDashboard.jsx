import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import AxiosInstance from "../utils/AxiosInstance";
import { format } from "date-fns";
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const response = await AxiosInstance.get("/analytics/dashboard", {
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
        summary: payload.summary || {},
        trafficBreakdown: payload.trafficBreakdown || [],
        deviceBreakdown: payload.deviceBreakdown || [],
        browserBreakdown: payload.browserBreakdown || [],
        topCountries: payload.topCountries || [],
        topPosts: payload.topPosts || [],
      });
    } catch (error) {
      console.error("Analytics error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [dateRange, token]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExport = () => {
    const csvContent = `Analytics Report\n${format(
      new Date(),
      "PPP"
    )}\n\nTotal Visits,${stats.summary?.totalVisits || 0}\nUnique Visitors,${
      stats.summary?.uniqueVisitors || 0
    }\nTotal Likes,${stats.summary?.totalLikes || 0}\nTotal Comments,${
      stats.summary?.totalComments || 0
    }`;

    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    link.download = `analytics-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-200">
          Loading analytics...
        </p>
      </div>
    );
  }

  const summary = stats.summary || {};
  const trafficBreakdown = stats.trafficBreakdown || [];
  const deviceBreakdown = stats.deviceBreakdown || [];
  const browserBreakdown = stats.browserBreakdown || [];
  const topPosts = stats.topPosts || [];

  const returningVisitors = Math.max(0, summary.returningVisitors || 0);

  // Chart colors
  const chartColors = [
    "#f97316",
    "#fb923c",
    "#fbbf24",
    "#fcd34d",
    "#fca5a5",
    "#f472b6",
  ];

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 dark:text-orange-300 mb-1">
            Analytics
          </p>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track your website performance and visitor insights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Date inputs */}
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

          {/* Export button */}
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/30 hover:from-orange-600 hover:to-yellow-500 transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Visits */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Total Visits
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(summary.totalVisits || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {summary.newVisitors || 0} new visitors
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
                {(summary.uniqueVisitors || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {returningVisitors} returning
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-green-500/20 text-green-600 dark:text-green-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Avg Time on Site */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Avg Time on Site
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {Math.round(summary.avgTimeOnSite || 0)}s
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {Math.round(summary.avgScrollDepth || 0)}% scroll depth
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Bounce Rate
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {Math.round(summary.bounceRate || 0)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Users who left
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-red-500/20 text-red-600 dark:text-red-400">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Total Likes */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Total Likes
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(summary.totalLikes || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Engagement metric
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-600 dark:text-pink-400">
              <Heart className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Total Comments */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl px-5 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 mb-1">
                Total Comments
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {(summary.totalComments || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                User interactions
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Breakdown Chart */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
                Traffic
              </p>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Traffic Sources
              </h3>
            </div>
            <PieChartIcon className="w-5 h-5 text-orange-500" />
          </div>

          {trafficBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trafficBreakdown}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {trafficBreakdown.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "12px",
                    color: isDark ? "#f3f4f6" : "#111827",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">
              No traffic data
            </p>
          )}
        </div>

        {/* Device Breakdown Chart */}
        <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
                Devices
              </p>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Device Breakdown
              </h3>
            </div>
            <BarChart3 className="w-5 h-5 text-orange-500" />
          </div>

          {deviceBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deviceBreakdown}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#e5e7eb"}
                />
                <XAxis dataKey="_id" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "12px",
                    color: isDark ? "#f3f4f6" : "#111827",
                  }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">
              No device data
            </p>
          )}
        </div>
      </div>

      {/* BROWSER BREAKDOWN */}
      <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
              Browsers
            </p>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              Browser Usage
            </h3>
          </div>
          <BarChart3 className="w-5 h-5 text-orange-500" />
        </div>

        {browserBreakdown.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={browserBreakdown}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="_id" stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "12px",
                  color: isDark ? "#f3f4f6" : "#111827",
                }}
              />
              <Bar dataKey="count" fill="#fb923c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No browser data
          </p>
        )}
      </div>

      {/* TOP POSTS */}
      <div className="rounded-3xl bg-white/90 dark:bg-white/5 border border-orange-100 dark:border-white/10 backdrop-blur-2xl p-5 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 dark:text-orange-300 mb-1">
              Content
            </p>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              Top Performing Posts
            </h3>
          </div>
          <TrendingUp className="w-5 h-5 text-orange-500" />
        </div>

        {topPosts.length > 0 ? (
          <div className="space-y-3">
            {topPosts.map((post, index) => (
              <div
                key={post.postId}
                className="rounded-2xl border border-orange-100 dark:border-white/10 bg-white/80 dark:bg-black/40 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                    <p className="text-white font-bold text-sm">#{index + 1}</p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {post.postTitle}
                    </p>
                    <div className="grid grid-cols-4 gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>
                        <p className="font-medium">Views</p>
                        <p className="text-gray-900 dark:text-white font-bold">
                          {post.views}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Unique</p>
                        <p className="text-gray-900 dark:text-white font-bold">
                          {post.uniqueVisitors}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Avg Time</p>
                        <p className="text-gray-900 dark:text-white font-bold">
                          {Math.round(post.avgTimeSpent)}s
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Scroll</p>
                        <p className="text-gray-900 dark:text-white font-bold">
                          {Math.round(post.avgScrollDepth)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-pink-500/20 dark:bg-pink-500/20">
                      <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-blue-500/20 dark:bg-blue-500/20">
                      <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No posts in this range
          </p>
        )}
      </div>
    </div>
  );
}
