import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LocalFilesItem = ({name, size, ctime}) => {
  return (
    <View style={styles.localfileItem} key={name}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.size}>{size} Bytes</Text>
      <Text style={styles.ctime}>{ctime.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
    fontWeight: '600',
    padding: 5,
  },
  size: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
  },
  ctime: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '400',
    padding: 5,
  },
  localfileItem: {
    height: 120,
    width: '95%',
    backgroundColor: '#fff',
    borderWidth: 0.1,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    padding: 10,
    marginBottom: 10,
  },
});

export default LocalFilesItem;
