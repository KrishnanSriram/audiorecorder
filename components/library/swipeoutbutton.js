import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SwiptoutButton = ({name, onPress}) => {
  return (
    <View
      style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}>
        <Icon name={name} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {

  },
});

export default SwiptoutButton;
