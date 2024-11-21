import {useState} from 'react';

// Interfaces para tipar los datos
export interface MealByCategory {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealsResponse {
  meals: MealByCategory[];
}

interface UseMealsByCategory {
  meals: MealByCategory[];
  loading: boolean;
  error: string | null;
  getMealsByCategory: (category: string) => Promise<void>;
  clearMeals: () => void; // Agregamos la nueva función al interface
}

const useMealsByCategory = (): UseMealsByCategory => {
  const [meals, setMeals] = useState<MealByCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getMealsByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      const data: MealsResponse = await response.json();
      setMeals(data.meals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const clearMeals = () => {
    setMeals([]);
    setError(null);
  };

  return {
    meals,
    loading,
    error,
    getMealsByCategory,
    clearMeals, // Exportamos la función
  };
};

export default useMealsByCategory;
