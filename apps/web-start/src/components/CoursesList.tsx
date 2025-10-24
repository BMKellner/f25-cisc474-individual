import { fetchCourses } from '../lib/api';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { waitForAuthReady } from '../lib/auth-ready';

export function CoursesList() {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch until Auth0 is done loading AND user is authenticated
    if (authLoading) {
      console.log('[CoursesList] Waiting for Auth0 to finish loading...');
      setLoading(true);
      return;
    }

    if (!isAuthenticated) {
      console.log('[CoursesList] User not authenticated, skipping fetch');
      setLoading(false);
      setError('Please log in to view courses');
      return;
    }

    console.log('[CoursesList] User authenticated, waiting for token getter...');
    
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Wait for token getter to be ready
        await waitForAuthReady();
        console.log('[CoursesList] Token getter ready, fetching courses...');
        
        const data = await fetchCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[CoursesList] Error fetching courses:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch courses';
        
        // Check if it's an authorization error
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
          setError('UNAUTHORIZED');
        } else {
          setError(errorMessage);
        }
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [isAuthenticated, authLoading]);

  // Always show authentication required message - courses are protected
  if (!isAuthenticated || authLoading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Courses from API</h3>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-400">🔒 Authentication Required</p>
          <p className="text-sm text-gray-400 mt-2">Please log in to view courses</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Courses from API</h3>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <span className="ml-3 text-gray-400">Loading courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    if (error === 'UNAUTHORIZED') {
      return (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Courses from API</h3>
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">🚫 Unauthorized</p>
            <p className="text-sm text-gray-400 mt-2">You don't have permission to view courses. Please contact your administrator.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Courses from API</h3>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
          <p className="text-sm text-gray-400 mt-2">Make sure the API server is running on port 3000</p>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Courses from API</h3>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-400">No courses data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Courses from API</h3>
      <div className="space-y-2">
        {courses.map((course: any) => (
          <div key={course.id} className="p-3 rounded border border-gray-700">
            <p className="font-medium">{course.name || `Course ${course.id}`}</p>
            <p className="text-sm text-gray-400">ID: {course.id}</p>
            {course.code && <p className="text-sm text-gray-400">Code: {course.code}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
