/// <reference types="nativewind/types" />

// Declaramos los tipos globales
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

// Extendemos los tipos de React Native
declare module 'react-native' {
  interface TextProps {
    className?: string;
  }
  interface ViewProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
}
