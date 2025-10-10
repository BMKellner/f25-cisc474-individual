import { fetchUsers } from '../lib/api';
import { useState, useEffect } from 'react';

export function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Users from API</h3>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <span className="ml-3 text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Users from API</h3>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
          <p className="text-sm text-gray-400 mt-2">Make sure the API server is running on port 3000</p>
        </div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Users from API</h3>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-400">No users data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Users from API</h3>
      <div className="space-y-2">
        {users.map((user: any) => (
          <div key={user.id} className="p-3 rounded border border-gray-700">
            <p className="font-medium">{user.name || user.email || `User ${user.id}`}</p>
            <p className="text-sm text-gray-400">ID: {user.id}</p>
            {user.email && <p className="text-sm text-gray-400">{user.email}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
