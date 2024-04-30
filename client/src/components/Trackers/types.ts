export interface Category {
  id: string;
  name: string;
  subCategories: string[];
}

export interface Tracker {
  id: string;
  categoryId: string;
  budget: number;
}
