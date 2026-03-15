import { useEffect } from 'react';
import { type User } from '@supabase/supabase-js';
import { useGetAllProjects } from '@/services/projects/queries';

export function useDashboardProjects(user: User | null) {
  void user;
  const { data, isLoading, refetch } = useGetAllProjects();

  const projects = data?.projects ?? [];
  const hasProcessingProjects = projects.some(p => p.status === 'processing');

  // Auto-refresh when there are processing projects
  useEffect(() => {
    if (!hasProcessingProjects) return;

    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [hasProcessingProjects, refetch]);

  return {
    projects,
    projectsLoading: isLoading,
    fetchProjects: refetch,
  };
}
