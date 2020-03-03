import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Footer = () => {
  return (
    <View>
      <Text style={styles.disclaimerTitle}>Disclaimer</Text>
      <Text style={styles.disclaimerText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  disclaimerTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    marginTop: 30,
  },
  disclaimerText: {
    fontSize: 13,
    fontWeight: '200',
    color: 'white',
    margin: 20,
  },
});

export default Footer;
