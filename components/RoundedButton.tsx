import React from "react";
import { View, Text } from "./Themed";
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import * as f from 'expo-font'


export default function RoundedButton({text, onPress} :
  {text: string, onPress:Function}){



  return (
    <TouchableOpacity onPress={(params) => onPress(params)}>
      <View style={styles.border}>
        <Text style={styles.btnText}>
          {text.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    margin: 7,
    paddingBottom: 18,
    paddingLeft: 32,
    paddingTop: 18,
    paddingRight: 32,    
    width: 200,
    alignSelf: "center",
    backgroundColor: "black",
  },btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
})