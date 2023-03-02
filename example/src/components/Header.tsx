/**
 * @format
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useBottomSheet } from 'react-native-bottom-sheet';

const Header = () => {
  const { close } = useBottomSheet();
  return (
    <View style={styles.container}>
      <Pressable onPress={close}>
        <Text style={styles.text}>INSERT_HEADER_CONTENT_HERE</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  text: {
    color: 'rgb(168,176,189)',
  },
});
