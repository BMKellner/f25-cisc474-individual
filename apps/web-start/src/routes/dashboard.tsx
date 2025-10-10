import { createFileRoute, Link } from '@tanstack/react-router';
import { UsersList } from '../components/UsersList';
import { CoursesList } from '../components/CoursesList';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const courses = [
    { id: 1, name: "Advanced Web Technonogies", code: "CISC474", progress: 75 },
    { id: 2, name: "Senior Design", code: "CISC498", progress: 60 },
    { id: 3, name: "System Hardening and Protection", code: "CPEG494", progress: 90 },
  ];

  const deadlines = [
    { title: "HW 1", course: "CISC474", due: "Sep 02" },
    { title: "Project", course: "CISC498", due: "Sep 06" },
    { title: "Quiz 1", course: "CPEG494", due: "Sep 13" },
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
                  <Link to="/courses" className="nav-link">Courses</Link>
                  <Link to="/api-data" className="nav-link">API Demo</Link>
                  <Link to="/admin" className="nav-link">Admin</Link>
                </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Live data from backend API</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="card group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{course.name}</h3>
                      <p className="text-sm text-gray-400">{course.code}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link to="/courses" className="btn-primary w-full text-center block">
                    Continue
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* API Data Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">API Data</h2>
              <div className="space-y-6">
                <UsersList />
                <CoursesList />
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Deadlines</h3>
              <div className="space-y-3">
                {deadlines.map((deadline, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{deadline.title}</p>
                        <p className="text-xs text-gray-400">{deadline.course}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                        {deadline.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
