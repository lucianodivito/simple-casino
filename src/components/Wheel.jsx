import React from 'react';
import {View, StyleSheet} from 'react-native';

const Wheel = () => {
  return (
    <>
      <View style={styles.circleRow}>
        <View style={[styles.pizza, styles.pizzaRed]} />
        <View style={[styles.pizza, styles.pizzaBlue]} />
      </View>
      <View style={styles.circleRow}>
        <View style={[styles.pizza, styles.pizzaGreen]} />
        <View style={[styles.pizza, styles.pizzaYellow]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  circleRow: {width: '100%', height: '50%', flexDirection: 'row'},
  pizza: {width: '50%', height: '100%'},
  pizzaRed: {backgroundColor: '#ce4257'},
  pizzaBlue: {backgroundColor: '#4361ee'},
  pizzaYellow: {backgroundColor: '#fee440'},
  pizzaGreen: {backgroundColor: '#06d6a0'},
});
