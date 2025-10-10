import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  const stats = [
    { label: "Students", value: "1,247" },
    { label: "Courses", value: "23" },
    { label: "Assignments", value: "156" },
    { label: "System", value: "99.9%" },
  ];

  const courses = [
    { name: "Advanced Web Technonogies", code: "CISC474", students: 45 },
    { name: "Senior Design", code: "CISC498", students: 52 },
    { name: "System Hardening and Protection", code: "CPEG494", students: 38 },
  ];

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
                  <a href="/api-data" className="nav-link">API Demo</a>
                  <a href="/admin" className="nav-link active">Admin</a>
                </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Management */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Courses</h2>
                <button className="btn-primary">
                  Create Course
                </button>
              </div>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{course.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{course.code}</p>
                        <div className="text-sm text-gray-400">
                          {course.students} students
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="btn-secondary px-3 py-1 text-sm">
                          Edit
                        </button>
                        <button className="btn-secondary px-3 py-1 text-sm">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="btn-secondary w-full">
                  Manage Users
                </button>
                <button className="btn-secondary w-full">
                  Analytics
                </button>
                <button className="btn-secondary w-full">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

