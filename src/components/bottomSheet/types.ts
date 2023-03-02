import type { ViewStyle } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface BottomSheetType {
  open: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
  translateY: Animated.SharedValue<number>;
  headerHeight: Animated.SharedValue<number>;
  headerOpacity: Animated.SharedValue<number>;
}

export type SnapPoint = NonNullable<ViewStyle['height']>;

export interface BottomSheetProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  grabBarContainerStyle?: ViewStyle;
  grabBarStyle?: ViewStyle;
  headerComponent: () => JSX.Element | null;
  bodyComponent: () => JSX.Element | null;
  headerContainerStyle?: ViewStyle;
  headerTransitionPoint: SnapPoint;
  initialSnapPoint: SnapPoint;
  snapPoints: Array<SnapPoint>;
}

export interface BottomSheetHeaderProps {
  snapPoints: Array<SnapPoint>;
  translateY: Animated.SharedValue<number>;
  headerHeight: Animated.SharedValue<number>;
  headerOpacity: Animated.SharedValue<number>;
  snapToIndex: (index: number) => void;
  open: () => void;
  close: () => void;
}
