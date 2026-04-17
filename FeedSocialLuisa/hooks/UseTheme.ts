import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const isDark = useColorScheme() === 'dark';
  return {
    colors: {
      background: isDark ? '#000000' : '#FFFFFF',
      text: isDark ? '#FFFFFF' : '#262626',
      primary: '#0095F6', // Azul estilo social media
      card: isDark ? '#121212' : '#FAFAFA',
      border: isDark ? '#262626' : '#DBDBDB',
    },
  };
};