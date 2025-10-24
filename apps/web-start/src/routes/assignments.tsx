import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/assignments')({
  component: RouteComponent,
});

type Tab = "file" | "text" | "link";

function RouteComponent() {
  const [tab, setTab] = useState<Tab>("file");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

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
                  <a href="/dashboard" className="nav-link">Dashboard</a>
                  <a href="/courses" className="nav-link">Courses</a>
                  <a href="/api-data" className="nav-link">API Demo</a>
                  <a href="/admin" className="nav-link">Admin</a>
                </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assignment Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
              <p className="text-gray-400">CS 4740</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Due Date</p>
                  <p className="text-lg font-semibold">Sep 15</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Points</p>
                  <p className="text-lg font-semibold">100</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-lg font-semibold text-yellow-400">In Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Submission Area */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6">Submit</h2>

              {/* Submission Tabs */}
              <div className="flex mb-6 border-b border-gray-700">
                <button
                  className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                    tab === "file" 
                      ? "border-pink-500 text-pink-400" 
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setTab("file")}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  File Upload
                </button>
                <button
                  className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                    tab === "text" 
                      ? "border-pink-500 text-pink-400" 
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setTab("text")}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Text Submission
                </button>
                <button
                  className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                    tab === "link" 
                      ? "border-pink-500 text-pink-400" 
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setTab("link")}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Link Submission
                </button>
              </div>

              {/* File Upload */}
              {tab === "file" && (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-pink-500 bg-pink-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Drop files here</h3>
                  <p className="text-gray-400 mb-4">Max 50MB</p>
                  <button className="btn-primary">Choose Files</button>
                </div>
              )}

              {/* Text Submission */}
              {tab === "text" && (
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800 text-white min-h-64 resize-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" 
                    placeholder="Write your submission here..."
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>0 / 5000 characters</span>
                  </div>
                </div>
              )}

              {/* Link Submission */}
              {tab === "link" && (
                <div className="space-y-4">
                  <input 
                    className="w-full p-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500" 
                    type="url" 
                    placeholder="https://your-project-link.com" 
                  />
                  <p className="text-sm text-gray-400">
                    Submit a link to your project
                  </p>
                </div>
              )}

              {/* Submission Actions */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                  <button className="btn-secondary">
                    Save Draft
                  </button>
                  <button className="btn-secondary">
                    Preview
                  </button>
                </div>
                <button className="btn-primary px-8 py-3">
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Details */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Course</p>
                  <p className="text-white">CS 4740</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Due Date</p>
                  <p className="text-white">Sep 15, 11:59 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
