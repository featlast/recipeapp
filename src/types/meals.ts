export interface Meal {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  instrucciones: string;
}

export interface MealAPI {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

export interface APIResponse {
  meals: MealAPI[] | null;
}
