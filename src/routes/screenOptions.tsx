import CustomHeader from './CustomHeader';

export const screenOptions = {
  header: ({route}: {route: any}) => <CustomHeader title={route.name} />,
  cardStyleInterpolator: ({current: {progress}}: {current: any}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '0deg'],
          }),
        },
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ],
    },
  }),
};
