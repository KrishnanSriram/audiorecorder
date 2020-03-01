import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';

const ARButton = ({title, onPress, active}) => {
  let style = active ? styles.activeButtonText : styles.buttonText;
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={style}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff',
    margin: 10,
    height: 30,
    width: 80,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00',
    textAlign: 'center',
  },
});

export default ARButton;
