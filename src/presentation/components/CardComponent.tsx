import {
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import React from 'react';
import {useMeals} from '../../hooks/useMeals';
import {Meal} from '../../types/meals';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../routes/MyStackNavigation';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CategoriesComponent from './CategoriesComponent';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CardComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {meals, loading, error} = useMeals();

  if (loading) return <ActivityIndicator size="large" color="#bf2e53" />;
  if (error)
    return (
      <Text className="text-red-500">{`Error al cargar las recetas: ${error}`}</Text>
    );

  //Render Componente FlatList
  const renderItem: ListRenderItem<Meal> = ({item, index}) => {
    return (
      <AnimatedTouchable
        entering={FadeInDown.delay(index * 150).duration(800)}
        activeOpacity={0.9}
        className="w-[50%] min-h-60 bg-white rounded-3xl shadow-2xl shadow-black/40 border-2 border-black/10"
        onPress={() => navigation.navigate('Detail', {...item})}>
        <Image
          source={{uri: item.imagen}}
          className="w-full h-[150px] rounded-t-[20px]"
        />
        <Text className="text-center text-sm font-bold text-pink-600 py-4">
          {item.nombre}
        </Text>
      </AnimatedTouchable>
    );
  };

  //Return Component Principal
  return (
    <React.Fragment>
      <CategoriesComponent />
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerClassName="gap-1"
      />
    </React.Fragment>
  );
};

export default CardComponent;
