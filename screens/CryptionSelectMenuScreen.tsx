import { Text, View } from "../components/Themed";
import * as React from 'react';
import { Pressable, StyleSheet } from "react-native";
import { RootTabParamList, RootTabScreenProps } from "../types";

export default function CryptionSelectMenu({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>){
  return(
    <View>
      <Text style={styles.title}>
        Выберите шифрование
      </Text>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionPermutation')
      }}>
        <Text style={styles.item}>
          Перестановка
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('NotFound')
      }}>
        <Text style={styles.item}>
          Шифр Полибия
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    padding: 20,
    fontWeight: "bold",
  }, item :{
    fontSize: 14,
    padding: 10,
    marginLeft: 20,
    marginRight: 25,
    paddingLeft: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 5,
  }
})