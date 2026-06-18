import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaShieldAlt, FaBan, FaCheck, FaEllipsisH } from "react-icons/fa";

const USERS_STORAGE_KEY = "prime-holiday-users";

const defaultUsers = [
  { id: "user-1", name: "Admin User", email: "admin@primeholiday.com", role: "admin", status: "active", createdAt: new Date().toISOString() },
  { id: "user-2", name: "Test User", email: "user@test.com", role: "user", status: "active", createdAt: new Date().toISOString() },
];

const Users = () => {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultUsers;
    } catch { return defaultUsers; }
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activityModal, setActivityModal] = useState(false);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const updateUser = (id, updates) => {
    saveUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
    setOpenDropdown(null);
  };

  const deleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      saveUsers(users.filter(u => u.id !== id));
    }
    setOpenDropdown(null);
  };

  const viewActivity = (user) => {
    setSelectedUser(user);
    setActivityModal(true);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = !search || 
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-sm text-slate-500">Manage user roles and permissions</p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Joined</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-sm text-slate-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm font-medium text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{user.createdAt || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <FaEllipsisH />
                      </button>
                      {openDropdown === user.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                          <button
                            onClick={() => viewActivity(user)}
                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                          >
                            View Activity
                          </button>
                          <button
                            onClick={() => updateUser(user.id, { role: user.role === "admin" ? "user" : "admin" })}
                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                          >
                            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                          </button>
                          <button
                            onClick={() => updateUser(user.id, { status: user.status === "active" ? "blocked" : "active" })}
                            className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                          >
                            {user.status === "active" ? "Block User" : "Unblock User"}
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {activityModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">User Activity</h3>
              <button onClick={() => setActivityModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-lg">
                {selectedUser.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{selectedUser.name}</p>
                <p className="text-sm text-slate-500">{selectedUser.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs text-slate-400">Last Login</p>
                <p className="text-sm text-slate-600">Recently</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs text-slate-400">Account Status</p>
                <p className="text-sm text-slate-600 capitalize">{selectedUser.status}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs text-slate-400">Role</p>
                <p className="text-sm text-slate-600 capitalize">{selectedUser.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
