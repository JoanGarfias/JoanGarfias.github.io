import matter from 'gray-matter';
import { marked } from 'marked';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  team: string;
  teamSize?: number;
  collaborators?: string[];
  role: string;
  technologies: string[];
  location: string;
  image: string;
  images: string[];
  content: string;
  demo?: string;
  github?: string;
}

export const useProjects = () => {
  const getProjectById = async (id: string): Promise<Project | null> => {
    try {
      const files = import.meta.glob('../content/proyectos/*.md', {
        query: '?raw',
        eager: true,
        import: 'default'
      });
      const filePath = `../content/proyectos/${id}.md`;
      const rawContent = files[filePath];

      if (!rawContent) return null;

      const { data, content } = matter(rawContent as string);
      const htmlContent = await marked.parse(content);

      return {
        ...(data as any),
        content: htmlContent
      } as Project;
    } catch (e) {
      console.error("Error loading project:", e);
      return null;
    }
  };

  const getAllProjects = async (): Promise<Project[]> => {
    try {
      const files = import.meta.glob('../content/proyectos/*.md', {
        query: '?raw',
        eager: true,
        import: 'default'
      });
      return Object.entries(files).map(([_, rawContent]) => {
        const { data, content } = matter(rawContent as string);
        return {
          ...(data as any),
          content: content // No parseado a HTML para listas
        } as Project;
      });
    } catch (e) {
      console.error("Error loading all projects:", e);
      return [];
    }
  };

  return {
    getProjectById,
    getAllProjects
  };
};
