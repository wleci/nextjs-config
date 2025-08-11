"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
}

export default function UsersPage() {
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

  return (
    <main className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                All Users ({users.length})
              </h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {user.name || "No name"}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Active user
                      </p>
                      <p className="text-xs text-slate-500">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
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
