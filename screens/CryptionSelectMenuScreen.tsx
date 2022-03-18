import { Text, View } from "../components/Themed";
import * as React from 'react';
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { RootTabParamList, RootTabScreenProps } from "../types";

export default function CryptionSelectMenu({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>){
  return(
    <ScrollView>
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
        navigation.navigate('CryptionPolybius')
      }}>
        <Text style={styles.item}>
          Шифр Полибия / усложненный  
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionMagicSquare')
      }}>
        <Text style={styles.item}>
          Магический квадрат
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionChaise')
      }}>
        <Text style={styles.item}>
          Шифр Чейза / усложненный
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionTritemius')
      }}>
        <Text style={styles.item}>
          Шифр Тритемия
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionBlockPermutation')
      }}>
        <Text style={styles.item}>
          Шифр блочной перестановки
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionBlockPermutationReverse')
      }}>
        <Text style={styles.item}>
          Расшифровка блочной перестановки
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionGamma')
      }}>
        <Text style={styles.item}>
          Гаммирование
        </Text>
      </Pressable>
      <Pressable onPress={()=>{
        navigation.navigate('CryptionGammaReverse')
      }}>
        <Text style={styles.item}>
          Расшифровка гаммирования
        </Text>
      </Pressable>
    </View>
    </ScrollView>
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