import React from 'react';
import { useQuery } from 'react-query';
import { dashboardAPI } from '../services/api';
import {
  Newspaper,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const Dashboard = () => {
  const { data: overview, isLoading } = useQuery(
    'dashboard-overview',
    dashboardAPI.getOverview,
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card">
              <div className="card-body">
                <div className="skeleton h-4 w-3/4 mb-2"></div>
                <div className="skeleton h-8 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = overview?.data?.overview;
  const recentActivities = overview?.data?.recentActivities;
  const monthlyStats = overview?.data?.monthlyStats;

  const statCards = [
    {
      title: 'Total News',
      value: stats?.news?.total || 0,
      subtitle: `${stats?.news?.published || 0} published`,
      icon: Newspaper,
      color: 'bg-blue-500',
    },
    {
      title: 'Team Members',
      value: stats?.teamMembers?.total || 0,
      subtitle: `${stats?.teamMembers?.active || 0} active`,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Publications',
      value: stats?.publications?.total || 0,
      subtitle: `${stats?.publications?.published || 0} published`,
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: 'Admin Users',
      value: stats?.admins?.total || 0,
      subtitle: `${stats?.admins?.active || 0} active`,
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  // Prepare chart data
  const chartData = monthlyStats?.news?.map((item, index) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
    news: item.count,
    publications: monthlyStats?.publications?.[index]?.count || 0,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Monthly Activity</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="news"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="News"
                />
                <Line
                  type="monotone"
                  dataKey="publications"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Publications"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Status Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Content Status</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    name: 'News',
                    published: stats?.news?.published || 0,
                    draft: stats?.news?.draft || 0,
                  },
                  {
                    name: 'Publications',
                    published: stats?.publications?.published || 0,
                    draft: stats?.publications?.total - stats?.publications?.published || 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="published" fill="#10b981" name="Published" />
                <Bar dataKey="draft" fill="#f59e0b" name="Draft" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Recent News</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {recentActivities?.news?.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      by {item.author?.username}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`badge ${
                        item.status === 'published'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentActivities?.news || recentActivities.news.length === 0) && (
                <p className="text-gray-500 text-center py-4">No recent news</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Publications */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Recent Publications</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {recentActivities?.publications?.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-info">{item.year}</span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentActivities?.publications || recentActivities.publications.length === 0) && (
                <p className="text-gray-500 text-center py-4">No recent publications</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;