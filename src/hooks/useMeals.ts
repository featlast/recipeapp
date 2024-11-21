import {useState, useCallback, useEffect} from 'react';
import {Meal, APIResponse} from '../types/meals';

interface UseMealsReturn {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  fetchMeals: () => Promise<void>;
}

export const useMeals = (): UseMealsReturn => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Hacemos múltiples peticiones para asegurar tener 10 platos
      const promises: Promise<APIResponse>[] = [];
      for (let i = 0; i < 2; i++) {
        promises.push(
          fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(
            response => response.json(),
          ),
        );
      }

      // Esperamos todas las respuestas
      const responses = await Promise.all(promises);

      // Extraemos los platos de todas las respuestas
      let allMeals: any[] = [];
      responses.forEach(response => {
        if (response.meals && Array.isArray(response.meals)) {
          allMeals = [...allMeals, ...response.meals];
        }
      });

      // Si necesitamos más platos, hacemos una petición al endpoint de búsqueda
      if (allMeals.length < 10) {
        const searchResponse = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?f=b',
        );
        const searchData: APIResponse = await searchResponse.json();
        if (searchData.meals && Array.isArray(searchData.meals)) {
          allMeals = [...allMeals, ...searchData.meals];
        }
      }

      // Tomamos los primeros 10 platos random y extraemos la información relevante
      const first10Meals = allMeals.slice(0, 10).map(meal => ({
        id: meal.idMeal,
        nombre: meal.strMeal,
        categoria: meal.strCategory,
        imagen: meal.strMealThumb,
        instrucciones: meal.strInstructions,
      }));

      setMeals(first10Meals);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Error desconocido al obtener los platos',
      );
      setLoading(false);
      console.error('Error al obtener los platos:', error);
    }
  }, []);

  // Ejecutar fetchMeals al montar el componente
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return {meals, loading, error, fetchMeals};
};
