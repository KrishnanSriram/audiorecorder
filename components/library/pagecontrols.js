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
    height: 40,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4169e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.49,
  },
  cancelButton: {
    backgroundColor: '#dc143c',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.49,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default PageControls;
