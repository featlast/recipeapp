import {NavigationContainer} from '@react-navigation/native';
import MyStackNavigation from './MyStackNavigation';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <MyStackNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
