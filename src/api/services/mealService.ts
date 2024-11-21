import {MealAPI, Meal} from '../../types/meals';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class MealsService {
  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  }

  public async getRandomMeals(): Promise<MealAPI[]> {
    const promises = Array(2)
      .fill(null)
      .map(() => this.fetchAPI<MealAPI>('/random.php'));
    return Promise.all(promises);
  }

  public async searchMealsByLetter(letter: string = 'b'): Promise<MealAPI> {
    return this.fetchAPI<MealAPI>(`/search.php?f=${letter}`);
  }

  //model data
  public formatMeal(meal: MealAPI): Meal {
    return {
      id: meal.idMeal,
      nombre: meal.strMeal,
      categoria: meal.strCategory,
      imagen: meal.strMealThumb,
      instrucciones: meal.strInstructions,
    };
  }
}

export const mealsService = new MealsService();
