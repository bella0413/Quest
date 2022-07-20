import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_KEY = {YOUR_API_KEY};

const WeatherContent = () => {
  const [days, setDays] = useState([]);
  const [weather, setWeather] = useState('');
  let weatherID;
  let city = 'Chicago';
  let latitude = 33.44;
  let longitude = -94.04;
  // prettier-ignore
  const weatherGroup = { 0: {icon: 'weather-sunny'}, 2: {icon: 'weather-lightning'}, 3: {icon: 'weather-rainy'}, 5: {icon: 'weather-pouring'}, 6: {icon: 'weather-snowy'}, 7: {icon: 'weather-fog'}, 8: {icon: 'weather-cloudy'},
  }

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    setDays(json);
    weatherID = json.weather[0].id;
    weatherID = 800
      ? setWeather(weatherGroup[0])
      : setWeather(weatherGroup[parseInt(weatherID / 100)]);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
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
          <Icon color="#ffffff" size={150} name={weather.icon}></Icon>
          <Text style={styles.temp}>
            {parseFloat(days.main.temp).toFixed(1)} ℃
          </Text>
          <Text style={styles.weather}>{days.weather[0].main}</Text>
        </View>
      )}
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
    paddingBottom: 20,
  },
  cityName: {
    fontSize: 64,
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
    paddingTop: 20,
  },
  weather: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default WeatherContent;
