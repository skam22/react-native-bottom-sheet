/**
 * @format
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useBottomSheet } from 'react-native-bottom-sheet';

const Body = () => {
  const { open, close, snapToIndex } = useBottomSheet();
  return (
    <View style={styles.container}>
      <Pressable onPress={open} style={styles.button}>
        <Text style={styles.text}>open bottom sheet</Text>
      </Pressable>
      <Pressable onPress={() => snapToIndex(1)} style={styles.button}>
        <Text style={styles.text}>snap to index 1</Text>
      </Pressable>
      <Pressable onPress={close} style={styles.button}>
        <Text style={styles.text}>close bottom sheet</Text>
      </Pressable>
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  button: {
    padding: 10,
    backgroundColor: 'rgb(15,15,25)',
    margin: 5,
    borderRadius: 4,
  },
  text: {
    color: 'rgb(168,176,189)',
  },
});
