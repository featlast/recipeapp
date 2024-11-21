import React from 'react';
import {View} from 'react-native';
import CardComponent from '../components/CardComponent';

const HomeScreen: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <CardComponent />
    </View>
  );
};

export default HomeScreen;
