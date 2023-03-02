/**
 * @format
 */

import React from 'react';
import type Animated from 'react-native-reanimated';
import type { SnapPoint } from 'src/components/bottomSheet/types';

export interface BottomSheetCtx {
  snapPoints: SnapPoint[];
  initialSnapPoint: SnapPoint;
  headerTransitionPoint: SnapPoint;
  headerTransitionPixels: number;
  initialSnapPointPixels: number;
  snapPointsPixels: number[];
  translateY: Animated.SharedValue<number>;
  headerHeight: Animated.SharedValue<number>;
  headerOpacity: Animated.SharedValue<number>;
  tapEnabled: boolean;
  open: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

const defaultBottomSheetContext: BottomSheetCtx = {
  snapPoints: [],
  initialSnapPoint: 0,
  headerTransitionPoint: 0,
  headerTransitionPixels: 0,
  initialSnapPointPixels: 0,
  snapPointsPixels: [],
  translateY: {} as Animated.SharedValue<number>,
  headerHeight: {} as Animated.SharedValue<number>,
  headerOpacity: {} as Animated.SharedValue<number>,
  tapEnabled: false,
  open: () => {},
  close: () => {},
  snapToIndex: () => {},
};

const BottomSheetContext = React.createContext<BottomSheetCtx>(
  defaultBottomSheetContext
);

const useBottomSheet = () => React.useContext(BottomSheetContext);
export { BottomSheetContext, useBottomSheet };
