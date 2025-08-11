"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Activity, BarChart3 } from "lucide-react";

interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
}

export default function DashboardOverview() {
  // Mock data - replace with real API calls later
  const users: User[] = [
    {
      id: 1,
      email: "john@example.com",
      name: "John Doe",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      email: "jane@example.com",
      name: "Jane Smith",
      createdAt: "2024-01-20T14:30:00Z",
    },
    {
      id: 3,
      email: "bob@example.com",
      name: "Bob Wilson",
      createdAt: "2024-02-01T09:15:00Z",
    },
    {
      id: 4,
      email: "alice@example.com",
      name: "Alice Johnson",
      createdAt: "2024-02-05T16:45:00Z",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "New Users",
      value: users.filter(
        (u) =>
          new Date(u.createdAt) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length,
      icon: TrendingUp,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Active Sessions",
      value: Math.floor(users.length * 0.7),
      icon: Activity,
      color: "bg-purple-500",
      change: "+15%",
    },
    {
      title: "System Health",
      value: "99.9%",
      icon: BarChart3,
      color: "bg-orange-500",
      change: "+0.1%",
    },
  ];

  return (
    <main className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Users
            </h3>
            <div className="space-y-3">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {user.name || "No name"}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                {
                  action: "User login",
                  user: "John Doe",
                  time: "2 minutes ago",
                },
                {
                  action: "Profile updated",
                  user: "Jane Smith",
                  time: "5 minutes ago",
                },
                {
                  action: "New user registered",
                  user: "Bob Wilson",
                  time: "10 minutes ago",
                },
                {
                  action: "Settings changed",
                  user: "Alice Johnson",
                  time: "15 minutes ago",
                },
                {
                  action: "User login",
                  user: "John Doe",
                  time: "20 minutes ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      by {activity.user}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
