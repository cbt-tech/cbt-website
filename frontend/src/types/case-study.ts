export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  summary: string;
  seo?: { title: string; description: string };
}
