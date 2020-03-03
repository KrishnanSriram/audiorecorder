import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ARButton = ({title, onPress, active}) => {
  let style = active ? styles.activeButtonText : styles.buttonText;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={title} size={30} color='white' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#1e90ff',
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
