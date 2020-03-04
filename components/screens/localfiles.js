import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Button,
} from 'react-native';
import * as RNFS from 'react-native-fs';
import {AudioUtils} from 'react-native-audio';
import CardView from 'react-native-cardview';

const LocalFilesListScreen = ({navigation}) => {
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('LOCALFILE: In Focus, now');
      setLoading(true);
      fetchFilesList();
      setLoading(false);
      return () => {
        setFilesList(null);
      };
    });

    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect FIRED');
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Record
          </Text>
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  const flatListHeader = () => {
    return (
      <View
        style={{
          height: 100,
          width: '100%',
          margin: 10,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{
            fontWeight: '100',
            flex: 1,
            alignSelf: 'center',
            paddingTop: 30,
            fontSize: 40,
          }}>
          Local records
        </Text>
      </View>
    );
  };

  const NoLocalFiles = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 40,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
          Loading....please wait!
        </Text>
      </View>
    );
  };

  const fetchFilesList = () => {
    RNFS.readDir(AudioUtils.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        // console.log('GOT RESULT', result);
        setFilesList(result);
      })
      .catch(err => {
        setError(err);
        console.log(err.message, err.code);
      });
  };
  if (loading === true || filesList == undefined) {
    return <NoLocalFiles />;
  }
  console.log('Files list count - ', filesList);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList style={{width: '100%', }}
        ListHeaderComponent={flatListHeader}
        getItemCount={filesList.count}
        data={filesList}
        renderItem={({item}) => {
          console.log(item);
          return (
            <View
              style={{
                height: 120,
                width: '95%',
                backgroundColor: '#fff',
                border: 2.9,
                borderColor: 'black',
                alignSelf: 'center',
                shadowColor: '#ccc',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 1,
                shadowRadius: 7.49,
                padding: 10,
                marginBottom: 10,
              }}
              key={item.name}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.size}>{item.size} Bytes</Text>
              <Text style={styles.ctime}>{item.ctime.toString()}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatview: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 2,
    shadowOffset: {width: 0, height: 10},
    shadowColor: '#ccc',
    backgroundColor: '#fff',
    width: '90%',
  },
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
});

export default LocalFilesListScreen;
