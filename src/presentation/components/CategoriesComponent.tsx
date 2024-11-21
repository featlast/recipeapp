import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import useCategories, {Category} from '../../hooks/useCategories';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from 'react-native-reanimated';
import useMealsByCategory, {
  MealByCategory,
} from '../../hooks/useMealsByCategory';
import useMealDetails from '../../hooks/useMealsDetails';
import {RootStackParams} from '../../routes/MyStackNavigation';
import {type NavigationProp, useNavigation} from '@react-navigation/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CategoriesComponent = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  //Listamos las categorías
  const {categories, loading, error} = useCategories();
  //Traemos la data de la categoria seleccionada
  const {
    meals,
    loading: loadingByCategory,
    error: errorByCategory,
    getMealsByCategory,
    clearMeals,
  } = useMealsByCategory();
  //Hook para traer la data de los productos cuando filtramos por categoria
  const {
    meals: mealDetail,
    loading: loadingUserMealDetails,
    error: errorMealDetails,
    getMealDetails,
  } = useMealDetails();

  // const handleGetDetails = (id, item) => {
  //   console.log('id', id, item);
  //   getMealDetails(id);
  //   if (mealDetail.length > 0) {
  //     console.log('meailDetail', mealDetail);
  //     navigation.navigate('Detail', {...mealDetail});
  //   }
  // };

  if (loadingByCategory)
    return <ActivityIndicator size="large" color="#bf2e53" />;
  if (errorByCategory)
    return (
      <Text className="text-red-500">{`Error al cargar las recetas: ${error}`}</Text>
    );

  if (loading) return <ActivityIndicator size="large" color="#bf2e53" />;
  if (error)
    return (
      <Text className="text-red-500">{`Error al cargar las recetas: ${error}`}</Text>
    );

  //Render Cards de Categorias
  const renderItem: ListRenderItem<Category> = ({item, index}) => {
    return (
      <AnimatedTouchable
        entering={FadeInLeft.delay(index * 150).duration(800)}
        activeOpacity={0.9}
        className="items-center justify-center mx-2 mb-4 min-w-[120px] h-20 bg-white rounded-3xl shadow-2xl shadow-black/40 border-2 border-black/10"
        onPress={() => {
          getMealsByCategory(item.strCategory);
        }}>
        <Image
          source={{uri: item.strCategoryThumb}}
          className="w-full h-full rounded-3xl"
          resizeMode="cover"
        />
        <Text
          className="font-semibold text-sm md:text-base lg:text-lg 
                     absolute bottom-2 bg-white/80 px-3 py-1.5 rounded-lg"
          numberOfLines={1}>
          {item.strCategory}
        </Text>
      </AnimatedTouchable>
    );
  };

  //Render de Cards de Productos de la categoria seleccionada
  const renderItemProducts: ListRenderItem<MealByCategory> = ({
    item,
    index,
  }) => {
    return (
      <AnimatedTouchable
        entering={FadeInDown.delay(index * 150).duration(800)}
        className="items-center justify-center mx-2 mb-4 
                   w-[180px] md:w-[240px] lg:w-[280px]
                   h-[100px] md:h-[140px] lg:h-[160px]
                   bg-white rounded-3xl shadow-2xl shadow-black/40 
                   border-2 border-black/10"
        onPress={() => getMealDetails(item.idMeal)}>
        <Image
          source={{uri: item.strMealThumb}}
          className="w-full h-full rounded-3xl"
          resizeMode="cover"
        />
        <Text
          className="font-semibold text-sm md:text-base lg:text-lg 
                     absolute bottom-2 bg-white/80 px-3 py-1.5 rounded-lg"
          numberOfLines={1}>
          {item.strMeal}
        </Text>
      </AnimatedTouchable>
    );
  };

  return (
    <React.Fragment>
      {meals.length <= 0 && (
        <Animated.Text
          className="text-start text-3xl font-bold text-red-900 mb-2"
          entering={FadeIn.delay(250).duration(900)}>
          Categorias
        </Animated.Text>
      )}

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.idCategory.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-2 py-2"
      />

      {meals.length > 0 && (
        <View className="p-4">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Productos:</Text>
            <TouchableOpacity className="p-2" onPress={clearMeals}>
              <Text className="text-blue-500 font-medium">Borrar Filtro</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={meals}
            renderItem={renderItemProducts}
            keyExtractor={item => item.idMeal.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-2 py-4"
            columnWrapperStyle={{
              justifyContent: 'space-evenly',
            }}
            className="w-full"
          />
        </View>
      )}
    </React.Fragment>
  );
};

export default CategoriesComponent;
