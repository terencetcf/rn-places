import { Platform } from 'react-native';

export default {
  isAndroid: (): boolean => {
    return Platform.OS === 'android';
  },
  isRecentAndroid: (): boolean => {
    return Platform.OS === 'android' && Platform.Version >= 21;
  },
};
