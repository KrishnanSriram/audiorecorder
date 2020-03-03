import React from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';

const PageControls = ({onSaveButton, onCancelButton}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
      }}>
      <TouchableHighlight
        onPress={onSaveButton}
        style={[styles.statusButton, styles.saveButton]}>
        <Text style={styles.buttonText}>Save & Send</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={onCancelButton}
        style={[styles.statusButton, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  statusButton: {
    margin: 20,
    width: '40%',
    height: 30,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4169e1',
  },
  cancelButton: {
    backgroundColor: '#fa8072',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '200',
    paddingTop: 2,
  },
});

export default PageControls;
