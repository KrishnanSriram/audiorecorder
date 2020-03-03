import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const SettingsItem = ({title, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <Text style={styles.item}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {
            title: 'Audio Settings',
            data: [
              {title: 'SampleRate', value: '22050'},
              {title: 'Channels', value: '1'},
              {title: 'AudioQuality', value: 'Low'},
              {title: 'AudioEncoding', value: 'aac'},
            ],
          },
          {
            title: 'Audio Storage',
            data: [
              {title: 'OneDrive', value: 'od://grange-legal/transcripts/legal'},
              {title: 'S3', value: 's3://grange-legal/transcripts/legal'},
            ],
          },
        ]}
        renderItem={({item}) => (
          <SettingsItem title={item.title} value={item.value} />
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: '500',
  },
  value: {
    padding: 2,
    marginLeft: 20,
    marginTop: 11,
    fontSize: 15,
    height: 44,
  },
});

export default SettingsScreen;
