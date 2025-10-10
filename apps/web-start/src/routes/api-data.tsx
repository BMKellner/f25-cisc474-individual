import { createFileRoute } from '@tanstack/react-router';
import { UsersList } from '../components/UsersList';
import { CoursesList } from '../components/CoursesList';

export const Route = createFileRoute('/api-data')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav className="glass-effect border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">EduFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="nav-link">Home</a>
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/courses" className="nav-link">Courses</a>
              <a href="/admin" className="nav-link">Admin</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">API Data Demo</h1>
          <p className="text-gray-400">This page demonstrates data fetching from your backend API</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <UsersList />
          <CoursesList />
        </div>

        <div className="mt-8 p-6 bg-pink-500/10 border border-pink-500/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-pink-400">API Endpoints Used:</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• <code className="bg-gray-800 px-2 py-1 rounded">GET /users</code> - Fetches all users</li>
            <li>• <code className="bg-gray-800 px-2 py-1 rounded">GET /courses</code> - Fetches all courses</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
