import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const NoLocalFiles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>Loading....please wait!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  },
  messageText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
});

export default NoLocalFiles;
