import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../routes/MyStackNavigation';

const DetailScreen: React.FC = () => {
  const {categoria, imagen, instrucciones, nombre} =
    useRoute<RouteProp<RootStackParams, 'Detail'>>().params;
  return (
    <View className="flex-1">
      <View>
        <Text className="text-center text-3xl font-bold text-red-900">
          {nombre}
        </Text>
        <Image
          source={{uri: imagen}}
          className="self-center w-[98%] h-[250px] md:h-[300px] lg:h-[350px] mt-2.5 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-left text-2xl font-bold text-red-900 mx-1">
          Categoria: {categoria}
        </Text>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-4 pb-5"
        showsVerticalScrollIndicator={false}>
        <Text className="text-justify text-lg font-bold text-red-800 mb-2">
          Preparación
        </Text>
        <Text className="text-justify text-sm font-normal text-black">
          {instrucciones}
        </Text>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
