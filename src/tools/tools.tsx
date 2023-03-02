import { Dimensions } from 'react-native';
import type { SnapPoint } from '../components/bottomSheet/types';

export const convertSnapPointToPixels = (input: SnapPoint) => {
  'worklet';
  const screenHeight = Dimensions.get('window').height;
  if (typeof input === 'string') {
    return (parseFloat(input) / 100) * screenHeight;
  } else {
    return input;
  }
};
