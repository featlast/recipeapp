import {Text, View, TouchableOpacity} from 'react-native';
import {
  type NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {RootStackParams} from './MyStackNavigation';

const CustomHeader: React.FC<{title: string}> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();

  return (
    <View className="flex flex-row items-center h-16 bg-pink-600 rounded-b-lg w-[99%] self-center">
      <View className="flex flex-1 items-start pl-4">
        {route.name !== 'Recetas' && (
          <TouchableOpacity hitSlop={30} onPress={() => navigation.goBack()}>
            <Text className="text-white text-sm font-bold">Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex flex-2 items-center">
        <Text className="text-lg font-bold text-white">{title}</Text>
      </View>
      <View className="flex flex-1 items-end pr-4" />
    </View>
  );
};

export default CustomHeader;
