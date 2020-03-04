import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';

const RightNavigationButton = ({title, onPress}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RightNavigationButton;
