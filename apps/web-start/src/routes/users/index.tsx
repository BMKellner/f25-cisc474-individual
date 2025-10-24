import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

interface UserOut {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
}

export const Route = createFileRoute('/users/')({
  component: UsersPage,
});

function UsersPage() {
  const {
    data: usersList,
    isLoading,
    error,
  } = useQuery<UserOut[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    // No auth required - users endpoint is public
  });

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <nav className="glass-effect border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl font-bold text-gradient">EduFlow</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/users" className="nav-link">Users</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gradient">User Management</h1>
          <Link to="/users/create">
            <button className="btn-primary">Create New User</button>
          </Link>
        </div>

        {isLoading && (
          <div className="card animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        )}

        {error && (
          <div className="card border-red-500 bg-red-900/20">
            <p className="text-red-400">
              <strong>Error:</strong> {error.message}
            </p>
          </div>
        )}

        {usersList && usersList.length === 0 && (
          <div className="card text-center">
            <p className="text-gray-400">No users found. Create one to get started!</p>
          </div>
        )}

        {usersList && usersList.length > 0 && (
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Verified</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">{user.name || <em className="text-gray-500">No name</em>}</td>
                    <td className="py-3 px-4">{user.email || <em className="text-gray-500">No email</em>}</td>
                    <td className="py-3 px-4">
                      {user.emailVerified ? <span className="text-green-400">✓</span> : <span className="text-gray-500">✗</span>}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to="/users/$userId/edit" params={{ userId: user.id }}>
                          <button className="btn-secondary text-sm">Edit</button>
                        </Link>
                        <Link to="/users/$userId/delete" params={{ userId: user.id }}>
                          <button className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700">Delete</button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}


