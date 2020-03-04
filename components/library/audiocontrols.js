import React from 'react';
import ARButton from './arbutton';
import {View, StyleSheet} from 'react-native';

const AudioControls = ({
  onRecord,
  onPlay,
  onStop,
  recordActive,
}) => {
  return (
    <View style={styles.audioControlsContainer}>
      <ARButton title="microphone" onPress={onRecord} active={recordActive} />
      <ARButton title="play" onPress={onPlay} />
      <ARButton title="stop" onPress={onStop} />
    </View>
  );
};

const styles = StyleSheet.create({
  audioControlsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
    marginLeft: 50,
    marginTop: 20,
  },
});

export default AudioControls;
