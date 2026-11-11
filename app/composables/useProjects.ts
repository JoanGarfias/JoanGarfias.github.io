import matter from 'gray-matter';
import { marked } from 'marked';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

export interface CaseStudyMeta {
  period?: string;
  team?: string;
  teamSize?: number;
  collaborators?: string[];
  location?: string;
}

export interface CaseStudySection {
  key: 'contexto' | 'problema' | 'solucion' | 'rol' | 'decisiones' | 'retos' | 'resultado' | 'otro';
  title: string;
  html: string;
}

export interface CaseStudy {
  meta: CaseStudyMeta;
  sections: CaseStudySection[];
}

// "## Qué hice yo" → 'rol', "## Resultado esperado" → 'resultado', etc.
const sectionKey = (title: string): CaseStudySection['key'] => {
  const t = title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  if (t.startsWith('contexto')) return 'contexto';
  if (t.startsWith('problema')) return 'problema';
  if (t.startsWith('solucion')) return 'solucion';
  if (t.startsWith('que hice') || t.startsWith('que hago')) return 'rol';
  if (t.startsWith('decisiones')) return 'decisiones';
  if (t.startsWith('retos')) return 'retos';
  if (t.startsWith('resultado')) return 'resultado';
  return 'otro';
};

const files = import.meta.glob('../content/proyectos/*.md', {
  query: '?raw',
  eager: true,
  import: 'default'
});

export const useProjects = () => {
  // Cuerpo del caso de estudio (content/proyectos/{slug}.md) dividido por sus secciones "## "
  const getCaseStudy = async (slug: string): Promise<CaseStudy | null> => {
    const rawContent = files[`../content/proyectos/${slug}.md`];
    if (!rawContent) return null;

    const { data, content } = matter(rawContent as string);
    const sections: CaseStudySection[] = [];

    for (const token of marked.lexer(content)) {
      if (token.type === 'heading' && token.depth === 2) {
        const title = token.text.replace(/:\s*$/, '').trim();
        sections.push({ key: sectionKey(title), title, html: '' });
      } else if (sections.length) {
        sections[sections.length - 1]!.html += await marked.parse(token.raw);
      }
    }

    return { meta: data as CaseStudyMeta, sections };
  };

  return { getCaseStudy };
};
