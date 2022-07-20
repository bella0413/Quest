import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import WeatherContent from './src/components/WeatherContent';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <WeatherContent></WeatherContent>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default App;
