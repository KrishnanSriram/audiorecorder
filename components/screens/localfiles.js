import React, {Component, useState, useEffect, useLayoutEffect, } from 'react';
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

const LocalFilesListScreen = ({ navigation }) => {
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetchFilesList();
    setLoading(false);
    return () => {
      setFilesList(null);
    };
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect FIRED');
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight style={{marginRight: 10}} onPress={() => navigation.navigate("Home")}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>Record</Text>
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  const NoLocalFiles = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 40,}}>
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
  console.log("Files list count - ", filesList);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        getItemCount={filesList.count}
        data={filesList}
        renderItem={({item}) => {
          console.log(item);
          return (
            <CardView
              cornerRadius={5} style={{margin: 10, border: 1, borderColor: '#ccc', borderWidth: 1, padding: 10}} key={item.name}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.name}>{item.size} Bytes</Text>
              <Text style={styles.name}>{item.ctime.toString()}</Text>
            </CardView>
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
  },
  email: {
    color: 'red',
  },
});

export default LocalFilesListScreen;
