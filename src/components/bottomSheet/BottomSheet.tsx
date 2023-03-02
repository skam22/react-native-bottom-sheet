/**
 * @format
 */

import React, {
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  defaultContainerStyle,
  defaultGrabBarContainerStyle,
  defaultGrabBarStyle,
  defaultHeaderContainerStyle,
} from './constants';
import { BottomSheetContext } from '../../context/BottomSheetContext';
import type { BottomSheetType, BottomSheetProps } from './types';
import { convertSnapPointToPixels } from '../../tools/tools';

const BottomSheetComponent = React.forwardRef<
  BottomSheetType,
  BottomSheetProps
>((props, ref) => {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {
    children,
    containerStyle,
    contentContainerStyle,
    grabBarStyle,
    grabBarContainerStyle,
    headerContainerStyle,
    initialSnapPoint,
    snapPoints,
    headerComponent: Header,
    bodyComponent: Body,
    headerTransitionPoint,
  } = props;

  const headerTransitionPixels = useMemo(
    (): number => convertSnapPointToPixels(headerTransitionPoint),
    [headerTransitionPoint]
  );
  const initialSnapPointPixels = useMemo(
    (): number => convertSnapPointToPixels(initialSnapPoint),
    [initialSnapPoint]
  );
  const snapPointsPixels = useMemo(
    (): number[] => snapPoints.map((point) => convertSnapPointToPixels(point)),
    [snapPoints]
  );

  const translateY = useSharedValue<number>(initialSnapPointPixels);
  const headerHeight = useSharedValue<number>(0);
  const headerOpacity = useDerivedValue(() => {
    return translateY.value < headerTransitionPixels
      ? withTiming(1)
      : withTiming(0);
  }, [translateY, screenHeight, headerTransitionPixels]);

  const [tapEnabled, setTapEnabled] = useState<boolean>(false);

  const openBottomSheet = useCallback(() => {
    'worklet';
    translateY.value = withTiming(0);
  }, [translateY]);
  const closeBottomSheet = useCallback(() => {
    'worklet';
    translateY.value = withTiming(screenHeight);
  }, [translateY, screenHeight]);
  const snapToIndex = useCallback(
    (index: number) => {
      'worklet';
      if (index <= snapPointsPixels.length - 1) {
        translateY.value = withTiming(snapPointsPixels[index] as number);
      }
    },
    [snapPointsPixels, translateY]
  );

  useImperativeHandle(ref, () => ({
    open: openBottomSheet,
    close: closeBottomSheet,
    snapToIndex: snapToIndex,
    get translateY() {
      return translateY;
    },
    get headerHeight() {
      return headerHeight;
    },
    get headerOpacity() {
      return headerOpacity;
    },
  }));

  const styles = StyleSheet.create({
    grabBarContainer: {
      ...defaultGrabBarContainerStyle,
      ...grabBarContainerStyle,
    },
    grabBar: {
      ...defaultGrabBarStyle,
      ...grabBarStyle,
    },
    bottomSheetContainer: {
      ...defaultContainerStyle,
      ...containerStyle,
    },
    headerContainer: {
      ...defaultHeaderContainerStyle,
      paddingTop: insets.top,
      ...headerContainerStyle,
    },
    contentContainer: {
      ...contentContainerStyle,
    },
  });

  const animatedStyles = {
    bottomSheetContainer: useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    })),
    headerContainer: useAnimatedStyle(() => ({
      opacity: headerOpacity.value,
    })),
    spacer: useAnimatedStyle(() => ({
      height: interpolate(
        translateY.value,
        snapPointsPixels,
        snapPointsPixels.map((_obj, index) =>
          index === 0 ? headerHeight.value : 0
        )
      ),
    })),
  };

  useAnimatedReaction(
    () => translateY.value,
    (result) => {
      runOnJS(setTapEnabled)(result !== initialSnapPointPixels);
    },
    [translateY, initialSnapPointPixels]
  );

  const tap = Gesture.Tap()
    .enabled(tapEnabled)
    .onStart(() => {
      cancelAnimation(translateY);
      translateY.value = withTiming(initialSnapPointPixels);
    });

  const pan = Gesture.Pan()
    .onChange(({ changeY }) => {
      translateY.value = translateY.value + changeY;
    })
    .onEnd(({ translationY, velocityY }) => {
      cancelAnimation(translateY);
      translateY.value = withTiming(
        snapPoint(translateY.value + translationY, velocityY, snapPointsPixels)
      );
    });

  return (
    <BottomSheetContext.Provider
      value={{
        snapPoints,
        initialSnapPoint,
        headerTransitionPoint,
        headerTransitionPixels,
        initialSnapPointPixels,
        snapPointsPixels,
        translateY,
        headerHeight,
        headerOpacity,
        tapEnabled,
        open: openBottomSheet,
        close: closeBottomSheet,
        snapToIndex,
      }}
    >
      <Animated.View
        pointerEvents={'box-none'}
        style={StyleSheet.absoluteFillObject}
      >
        <GestureDetector gesture={tap}>
          <Animated.View
            style={StyleSheet.absoluteFillObject}
            pointerEvents={tapEnabled ? 'auto' : 'box-none'}
          >
            {children}
          </Animated.View>
        </GestureDetector>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            animatedStyles.bottomSheetContainer,
          ]}
        >
          <GestureDetector gesture={pan}>
            <Animated.View style={styles.grabBarContainer}>
              <View style={styles.grabBar} />
            </Animated.View>
          </GestureDetector>
          <View style={styles.contentContainer}>
            <Animated.ScrollView scrollEventThrottle={16}>
              <Animated.View style={animatedStyles.spacer} />
              <Body />
            </Animated.ScrollView>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.headerContainer, animatedStyles.headerContainer]}
          onLayout={useCallback(
            (event: LayoutChangeEvent) => {
              headerHeight.value = event.nativeEvent.layout.height;
            },
            [headerHeight]
          )}
        >
          <Header />
        </Animated.View>
      </Animated.View>
    </BottomSheetContext.Provider>
  );
});

const MemoizedBottomSheet = memo(BottomSheetComponent);
MemoizedBottomSheet.displayName = 'BottomSheet';

export default MemoizedBottomSheet;
