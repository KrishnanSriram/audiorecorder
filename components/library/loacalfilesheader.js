import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LocalFilesHeader = () => {
  return (
    <View style={styles.flatListHeader}>
      <Text style={styles.flatListHeaderText}>Local records</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListHeader: {
    height: 100,
    width: '100%',
    margin: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  flatListHeaderText: {
    fontWeight: '100',
    flex: 1,
    alignSelf: 'center',
    paddingTop: 30,
    fontSize: 40,
  },
});

export default LocalFilesHeader;
