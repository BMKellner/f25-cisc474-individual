import { createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-8">Please log in to view this page.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || user?.email}!</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <pre className="bg-gray-800 p-4 rounded overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}

