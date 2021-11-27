import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function RoundedButton({text, onPress} :
  {text: string, onPress:Function}){
  return (
    <TouchableOpacity onPress={(params) => onPress(params)}>
      <View style={styles.border}>
        <Text style={styles.btnText}>
          {text}
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
    margin: 12,
    padding: 5,
    width: 175,
    alignSelf: "center",
    backgroundColor: "#2980b9"
  },btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
})