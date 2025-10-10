import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
});

function RouteComponent() {
  const modules = [
    { id: 1, title: "Introduction", lessons: 5, completed: 5 },
    { id: 2, title: "HTML & CSS", lessons: 8, completed: 6 },
    { id: 3, title: "JavaScript", lessons: 12, completed: 3 },
    { id: 4, title: "React", lessons: 10, completed: 0 },
  ];

  const assignments = [
    { id: 1, title: "Portfolio", due: "Sep 15", status: "in-progress" },
    { id: 2, title: "Todo App", due: "Sep 22", status: "not-started" },
    { id: 3, title: "API Project", due: "Sep 29", status: "not-started" },
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
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/api-data" className="nav-link">API Demo</Link>
                  <Link to="/admin" className="nav-link">Admin</Link>
                </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Web Development</h1>
              <p className="text-gray-400">CS 4740</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">75%</div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Modules */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6">Modules</h2>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <span className="text-sm text-gray-400">{module.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{module.completed}/{module.lessons}</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="btn-primary px-4 py-2 text-sm">
                        {module.completed === module.lessons ? 'Review' : 'Continue'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6">Assignments</h2>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Link key={assignment.id} to="/assignments" className="block">
                    <div className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
                            {assignment.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Due: {assignment.due}</div>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            assignment.status === 'in-progress' 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {assignment.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
                <Link to="/assignments" className="btn-primary w-full text-center block">
                  Submit Assignment
                </Link>
                <button className="btn-secondary w-full">
                  View Grades
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
