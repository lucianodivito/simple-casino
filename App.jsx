import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';
import Navigation from './src/navigation/Navigation';

function App() {
  return <Navigation />;
}

LogBox.ignoreAllLogs();

export default App;
