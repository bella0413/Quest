import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const API_KEY = {YOUR_API_KEY};

const WeatherContent = () => {
  const [days, setDays] = useState([]);
  let city = 'Chicago';
  let latitude = 33.44;
  let longitude = -94.04;

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    setDays(json);
    console.log(json);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{marginTop: 50}}
              size="large"
            />
          </View>
        ) : (
          <View style={styles.day}>
            <Text style={styles.temp}>
              {parseFloat(days.main.temp).toFixed(1)}
            </Text>
            <Text style={styles.weather}>{days.weather[0].main}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    marginBottom: 20,
  },
  cityName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    color: '#ffffff',
    fontSize: 36,
  },
  weather: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default WeatherContent;
