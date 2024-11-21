import {useState} from 'react';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../routes/MyStackNavigation';

interface Recipe {
  categoria: string;
  imagen: string;
  instrucciones: string;
  nombre: string;
}

interface UseMealDetails {
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  getMealDetails: (id: string) => Promise<void>;
}

const useMealDetails = (): UseMealDetails => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMealDetails = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (!response.ok) throw new Error('Error al obtener la receta');
      const data = await response.json();
      if (!data.meals?.[0]) throw new Error('Receta no encontrada');

      const apiMeal = data.meals[0];
      const recipeData: Recipe = {
        categoria: apiMeal.strCategory,
        imagen: apiMeal.strMealThumb,
        instrucciones: apiMeal.strInstructions,
        nombre: apiMeal.strMeal,
      };

      setRecipe(recipeData);
      navigation.navigate('Detail', {...recipeData});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return {recipe, loading, error, getMealDetails};
};

export default useMealDetails;
