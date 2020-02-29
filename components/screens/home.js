import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>This is HOME Screen</Text>
        <Button
            title="Settings"
            style={styles.navigationButton}
            onPress={() => navigation.navigate('Settings')}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 20,
    },
    headline: {
      fontSize: 44,
      fontWeight: '500',
    },
    navigationButton: {
        marginTop: 20
    }
})

export default HomeScreen;
