/**
 * @format
 */

import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetType } from 'react-native-bottom-sheet';
import Header from './components/Header';
import Body from './components/Body';

const AppWrapper = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};

const App = () => {
  const bottomSheetRef = React.useRef<BottomSheetType>(null);

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        initialSnapPoint={'90%'}
        snapPoints={[0, '50%', '90%']}
        ref={bottomSheetRef}
        headerComponent={Header}
        bodyComponent={Body}
        headerTransitionPoint={'20%'}
        contentContainerStyle={styles.contentContainer}
      >
        <ImageBackground
          source={{
            uri: 'https://w0.peakpx.com/wallpaper/538/541/HD-wallpaper-iphone-apple-beach-ios-ocean-phone-sea-seashore-tropical-water.jpg',
          }}
          style={styles.imageContainer}
          imageStyle={styles.imageStyle}
        >
          <Text style={styles.title}>Bottom Sheet Example</Text>
        </ImageBackground>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(40,44,52)',
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 250,
    alignItems: 'center',
  },
  imageStyle: { opacity: 0.25 },
  title: { fontSize: 30, color: 'white', fontWeight: 'bold' },
  subtitle: { fontSize: 24, color: 'white' },
});
