"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ToastContainer, useToast } from "@/components/ui/toast";
import { Plus, Loader2, Edit, Trash2, X, Save } from "lucide-react";

interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "" });
  const [addLoading, setAddLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!addForm.email.trim() || !addForm.password.trim()) {
      toast.error("Validation Error", "Email and password are required");
      return;
    }

    setAddLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          "Create Failed",
          errorData.error || "Failed to create user"
        );
        return;
      }

      await fetchUsers();
      setShowAddModal(false);
      setAddForm({ name: "", email: "", password: "" });
      toast.success("User Created", "New user has been created successfully");
    } catch {
      toast.error("Create Failed", "An unexpected error occurred");
    } finally {
      setAddLoading(false);
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user.id);
    setEditForm({ name: user.name || "", email: user.email });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "" });
  };

  const saveEdit = async (userId: number) => {
    if (!editForm.email.trim()) {
      toast.error("Validation Error", "Email is required");
      return;
    }

    setActionLoading(userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchUsers();
        setEditingUser(null);
        setEditForm({ name: "", email: "" });
        toast.success(
          "User Updated",
          "User information has been updated successfully"
        );
      } else {
        const errorData = await response.json();
        toast.error(
          "Update Failed",
          errorData.error || "Failed to update user"
        );
      }
    } catch {
      toast.error("Update Failed", "An unexpected error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteUser = async (userId: number) => {
    setActionLoading(userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUsers();
        setDeleteConfirm(null);
        toast.success("User Deleted", "User has been deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(
          "Delete Failed",
          errorData.error || "Failed to delete user"
        );
      }
    } catch {
      toast.error("Delete Failed", "An unexpected error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-slate-600 dark:text-slate-300">
            Loading users...
          </span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <Button onClick={fetchUsers} className="mt-4">
            Try Again
          </Button>
        </div>
      </main>
    );
  }

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
              <Button onClick={() => setShowAddModal(true)} className="gap-2">
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
                  {editingUser === user.id ? (
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col gap-2 flex-1">
                        <input
                          type="text"
                          placeholder="Name"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveEdit(user.id)}
                          disabled={actionLoading === user.id}
                          className="gap-1"
                        >
                          {actionLoading === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelEdit}
                          className="gap-1"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          ID: {user.id}
                        </p>
                        <p className="text-xs text-slate-500">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-400">
                          Updated{" "}
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(user)}
                          className="gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        {deleteConfirm === user.id ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteUser(user.id)}
                              disabled={actionLoading === user.id}
                              className="gap-1"
                            >
                              {actionLoading === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Confirm"
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteConfirm(null)}
                              className="gap-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteConfirm(user.id)}
                            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setAddForm({ name: "", email: "", password: "" });
        }}
        title="Add New User"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={addForm.email}
              onChange={(e) =>
                setAddForm({ ...addForm, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password *
            </label>
            <input
              type="password"
              value={addForm.password}
              onChange={(e) =>
                setAddForm({ ...addForm, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setAddForm({ name: "", email: "", password: "" });
              }}
              disabled={addLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={addLoading}
              className="gap-2"
            >
              {addLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Create User
            </Button>
          </div>
        </div>
      </Modal>

      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </main>
  );
}
