/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {StyleSheet, Text, View} from 'react-native';
 import Hangman from './components/hangman'
 
 const App = () => {
   return (
       <View style={styles.container}>
         <Hangman/>
       </View>
   );
 };
 
 
 const styles = StyleSheet.create({
 container:{
   flex: 1,
 }
 });
 
 export default App;
 