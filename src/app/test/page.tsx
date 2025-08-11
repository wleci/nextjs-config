"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Shield, User, Lock, Plus, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function ApiTestPage() {
  const [results, setResults] = useState<
    Array<{
      id: number;
      test: string;
      status: number;
      data: unknown;
      timestamp: string;
      success: boolean;
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const addResult = (test: string, status: number, data: unknown) => {
    const result = {
      id: Date.now(),
      test,
      status,
      data,
      timestamp: new Date().toLocaleTimeString(),
      success: status >= 200 && status < 300,
    };
    setResults((prev) => [result, ...prev]);
  };

  const testApi = async (
    endpoint: string,
    method: string = "GET",
    body?: unknown
  ) => {
    setLoading(true);
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(endpoint, options);
      const data = await response.json();

      addResult(`${method} ${endpoint}`, response.status, data);
    } catch (error: unknown) {
      addResult(`${method} ${endpoint}`, 0, {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults([]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              API Security Test
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-500">
                ← Back to Home
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Auth Status */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border">
            <div className="flex items-center gap-3">
              {status === "loading" ? (
                <div className="animate-pulse">Loading...</div>
              ) : session ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    Logged in as: {session.user?.email}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Not logged in</span>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {session ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 mt-4">
            Test protected API endpoints to verify authentication is working.
            Try testing both while logged in and logged out to see the
            difference.
          </p>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={() => testApi("/api/users")}
            disabled={loading}
            className="gap-2 h-auto p-4 flex-col"
          >
            <User className="h-5 w-5" />
            <span>GET /api/users</span>
            <span className="text-xs opacity-75">List all users</span>
          </Button>

          <Button
            onClick={() => testApi("/api/profile")}
            disabled={loading}
            className="gap-2 h-auto p-4 flex-col"
          >
            <Shield className="h-5 w-5" />
            <span>GET /api/profile</span>
            <span className="text-xs opacity-75">Current user profile</span>
          </Button>

          <Button
            onClick={() => testApi("/api/users/1")}
            disabled={loading}
            className="gap-2 h-auto p-4 flex-col"
          >
            <User className="h-5 w-5" />
            <span>GET /api/users/1</span>
            <span className="text-xs opacity-75">Specific user</span>
          </Button>

          <Button
            onClick={() =>
              testApi("/api/users", "POST", {
                email: `test${Date.now()}@example.com`,
                name: "Test User",
                password: "test123",
              })
            }
            disabled={loading}
            className="gap-2 h-auto p-4 flex-col"
            variant="outline"
          >
            <Plus className="h-5 w-5" />
            <span>POST /api/users</span>
            <span className="text-xs opacity-75">Create user</span>
          </Button>

          <Button
            onClick={() =>
              testApi("/api/profile", "PUT", {
                name: `Updated Name ${Date.now()}`,
              })
            }
            disabled={loading}
            className="gap-2 h-auto p-4 flex-col"
            variant="outline"
          >
            <User className="h-5 w-5" />
            <span>PUT /api/profile</span>
            <span className="text-xs opacity-75">Update profile</span>
          </Button>

          <Button
            onClick={() =>
              testApi("/api/profile/password", "PUT", {
                currentPassword: "demo123",
                newPassword: "newpass123",
              })
            }
            disabled={loading}
            className="gap-2 h-auto p-4 flex-col"
            variant="outline"
          >
            <Lock className="h-5 w-5" />
            <span>PUT /api/profile/password</span>
            <span className="text-xs opacity-75">Change password</span>
          </Button>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={clearResults}
            variant="outline"
            disabled={results.length === 0}
          >
            Clear Results
          </Button>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Play className="h-4 w-4" />
            {loading ? "Testing..." : `${results.length} tests completed`}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.map((result) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border ${
                result.success
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">
                    {result.test}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      result.success
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {result.timestamp}
                </span>
              </div>
              <pre className="text-xs bg-slate-100 dark:bg-slate-800 p-3 rounded overflow-x-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </motion.div>
          ))}

          {results.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                No tests run yet. Click a button above to test API endpoints.
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg border">
          <h3 className="font-semibold mb-2">Expected Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-green-600">
                When Logged In:
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                <li>
                  • <span className="text-green-600">200</span> - Success for
                  most endpoints
                </li>
                <li>
                  • <span className="text-green-600">201</span> - User created
                  successfully
                </li>
                <li>
                  • <span className="text-yellow-600">400</span> - Bad request
                  (invalid data)
                </li>
                <li>
                  • <span className="text-red-600">403</span> - Forbidden (admin
                  only)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-red-600">
                When Logged Out:
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                <li>
                  • <span className="text-red-600">401</span> - Unauthorized for
                  all endpoints
                </li>
                <li>• Error: &quot;Unauthorized - Please log in&quot;</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
