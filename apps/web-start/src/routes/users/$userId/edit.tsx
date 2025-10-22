import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, FormEvent, useEffect } from 'react';
import { backendFetcher, mutateBackend } from '../../../integrations/fetcher';

interface UserOut {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  createdAt: Date;
}

interface UserUpdateIn {
  name?: string;
  email?: string;
  emailVerified?: boolean;
}

export const Route = createFileRoute('/users/$userId/edit')({
  component: EditUserPage,
});

function EditUserPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const { data: user, isLoading, error } = useQuery<UserOut>({
    queryKey: ['users', userId],
    queryFn: backendFetcher<UserOut>(`/users/${userId}`),
  });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setEmailVerified(!!user.emailVerified);
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: (data: UserUpdateIn) =>
      mutateBackend<UserUpdateIn, UserOut>(`/users/${userId}`, 'PATCH', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', userId] });
      navigate({ to: '/users' });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      name,
      email,
      emailVerified,
    });
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

        <h1 className="text-4xl font-bold text-gradient mb-8">Edit User</h1>

        {isLoading && (
          <div className="card animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-full"></div>
          </div>
        )}

        {error && (
          <div className="card border-red-500 bg-red-900/20">
            <p className="text-red-400"><strong>Error:</strong> {error.message}</p>
          </div>
        )}

        {user && (
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailVerified"
                  checked={emailVerified}
                  onChange={(e) => setEmailVerified(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
                />
                <label htmlFor="emailVerified" className="ml-2 text-sm text-gray-300">
                  Email is verified
                </label>
              </div>

              <div className="text-sm text-gray-500">
                <strong>User ID:</strong> {userId}
              </div>

              {updateMutation.isError && (
                <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
                  <p className="text-red-400"><strong>Error:</strong> {updateMutation.error.message}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update User'}
                </button>
                <Link to="/users" className="flex-1">
                  <button type="button" className="btn-secondary w-full">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
