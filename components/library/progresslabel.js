import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ProgressLabel = ({currentTime}) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.progressText}>{currentTime}s</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  progressText: {
    color: '#ffffff',
    position: 'absolute',
    fontSize: 50,
    fontWeight: 'bold',
    height: 70,
    textAlignVertical: 'center',
    flex: 1,
  },
  circle: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: '#f4511e',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default ProgressLabel;
