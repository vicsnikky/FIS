export interface ContentPost {
  id: string;
  title: string;
  description: string;
  category: 'gallery' | 'news' | 'event';
  imageUrl?: string;
  videoUrl?: string;
  createdAt: number;
}

export interface AppSettings {
  adminPasswordHash: string;
}
