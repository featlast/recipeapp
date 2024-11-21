import {createStackNavigator} from '@react-navigation/stack';

import {screenOptions} from './screenOptions';
import HomeScreen from '../presentation/views/HomeScreen';
import DetailScreen from '../presentation/views/DetailScreen';

interface Recipe {
  categoria: string;
  imagen: string;
  instrucciones: string;
  nombre: string;
}

export type RootStackParams = {
  Recetas: undefined;
  Detail: Recipe;
};

const Stack = createStackNavigator<RootStackParams>();

function MyStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Recetas" screenOptions={screenOptions}>
      <Stack.Screen name="Recetas" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default MyStackNavigation;
