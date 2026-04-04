import projectsData from '~/assets/projects.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  period: string;
  team: 'Solo' | 'Collaborative';
  role: string;
  technologies: string[];
  location: string;
  link?: string;
}

export const useProjects = () => {
  const projects = ref<Project[]>(projectsData as Project[]);

  return {
    projects,
    getProjectById: (id: string) => projects.value.find(p => p.id === id)
  };
};
