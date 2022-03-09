import { ImageBackground, StyleSheet, Text, View, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import React, { useState } from 'react'
import MainScreen from './components/MainScreen';
import { I18nManager } from 'react-native';

const App = () => {
  try {
    I18nManager.allowRTL(false);
  }
  catch (e) {
    console.log(e);
  }

  return (
    <MainScreen></MainScreen>
  )
}

export default App;





