import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteUser, fetchUser } from '../../../lib/api';

interface UserOut {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
}

export const Route = createFileRoute('/users/$userId/delete')({
  component: DeleteUserPage,
});

function DeleteUserPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const { data: user, isLoading, error } = useQuery<UserOut>({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    enabled: isAuthenticated && !authLoading,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate({ to: '/users' });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/users" className="text-purple-400 hover:text-purple-300">
            ← Back to Users
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-red-500 mb-8">Delete User</h1>

        {isLoading && (
          <div className="card animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        )}

        {error && (
          <div className="card border-red-500 bg-red-900/20">
            <p className="text-red-400"><strong>Error:</strong> {error.message}</p>
          </div>
        )}

        {user && (
          <div className="card border-red-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Are you sure?</h2>
              <p className="text-gray-300 mb-4">
                You are about to permanently delete the following user. This action cannot be undone.
              </p>

              <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                <div>
                  <span className="text-gray-400">Name:</span>{' '}
                  <span className="text-white font-medium">{user.name || <em>No name</em>}</span>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>{' '}
                  <span className="text-white font-medium">{user.email || <em>No email</em>}</span>
                </div>
                <div>
                  <span className="text-gray-400">User ID:</span>{' '}
                  <span className="text-white font-mono text-sm">{userId}</span>
                </div>
                <div>
                  <span className="text-gray-400">Created:</span>{' '}
                  <span className="text-white">{new Date(user.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {deleteMutation.isError && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg mb-4">
                <p className="text-red-400"><strong>Error:</strong> {deleteMutation.error.message}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete User'}
              </button>
              <Link to="/users" className="flex-1">
                <button className="w-full btn-secondary">No, Cancel</button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
