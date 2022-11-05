
export interface MoviesListViewMode {
  id: number;
  name: string;
  image: string;
  description: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface CategoryModel {
  category_id: number;
  name: string;
}

export interface MovieDetailsModel {
  id: number;
  name: string;
  image: string;
  description: string;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  category: CategoryModel
}

export interface CategoryListModel {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
