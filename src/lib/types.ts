export interface Recipe {
  _id: string;
  _type: 'recipe';
  title: string;
  slug: { current: string };
  mainImage: any;
  videoUrl?: string;
  prepTime: number;
  cookTime: number;
  rating?: number;
  tags: string[];
  ingredients: any[];
  instructions: any[];
  _createdAt: string;
  _updatedAt: string;
}
