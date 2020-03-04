import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import * as RNFS from 'react-native-fs';
import {AudioUtils} from 'react-native-audio';
import Swipeout from 'react-native-swipeout';
import LocalFilesHeader from '../library/loacalfilesheader';
import NoLocalFiles from '../library/nolocalfiles';
import LocalFilesItem from '../library/localfilesitem';
import SwiptoutButton from '../library/swipeoutbutton';
import RightNavigationButton from '../library/rightnavigationbutton';

const LocalFilesListScreen = ({navigation}) => {
  const [filesList, setFilesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const delFile = (filePath, index) => {
    console.log('Delete file at ', filePath);
    RNFS.unlink(filePath)
      .then(() => {
        console.log('FILE DELETED');
        const filteredData = filesList.filter(
          (item, itemIndex) => itemIndex !== index,
        );
        setFilesList(filteredData);
        setRefresh(true);
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.log(err.message);
      });
  };

  const moveFileToS3 = filePath => {
    console.log('Move file ', filePath);
  };

  const rightButtons = (fileItem, index) => {
    const swipeoutBtns = [
      {
        component: (
          <SwiptoutButton
            name="trash"
            onPress={() => delFile(fileItem.path, index)}
          />
        ),
        backgroundColor: '#dc143c',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      },
      {
        component: (
          <SwiptoutButton
            name="cloud"
            onPress={() => moveFileToS3(fileItem.path)}
          />
        ),
        backgroundColor: '#5f9ea0',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      },
    ];
    return swipeoutBtns;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('LOCALFILE: In Focus, now');
      setLoading(true);
      fetchFilesList();
      setLoading(false);
      setRefresh(false);
      return () => {
        setFilesList(null);
      };
    });

    return unsubscribe;
  }, [navigation, refresh]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect FIRED');
    navigation.setOptions({
      headerRight: () => (
        <RightNavigationButton
          title="Record"
          onPress={() => navigation.navigate('Home')}
        />
      ),
    });
  }, [navigation]);

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
      <FlatList
        style={{width: '100%'}}
        ListHeaderComponent={<LocalFilesHeader />}
        getItemCount={filesList.count}
        data={filesList}
        renderItem={({item, index}) => {
          console.log(index);
          return (
            <Swipeout
              right={rightButtons(item, index)}
              style={styles.swipeFlatviewItem}>
              <LocalFilesItem
                name={item.name}
                size={item.size}
                ctime={item.ctime}
              />
            </Swipeout>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swipeFlatviewItem: {
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 2,
    margin: 5,
    backgroundColor: 'transparent',
  },
});

export default LocalFilesListScreen;
