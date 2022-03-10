import * as React from 'react';
import { Button, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import { Text, View } from '../components/Themed';
import RoundedButton from '../components/RoundedButton';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import MyRandomizer from '../services/MyRandomizer';

export default function CryptionChaiseScreen({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) {
  let [alphabet, setalphabet] = React.useState([
    ['а','б','в','г','д','е', 'ж', 'з', 'и', 'к'],
    ['л','м','н','о','п','р', 'с', 'т', 'у', 'ф'],
    ['х','ц','ч','ш','щ','ь', 'ы', 'э', 'ю', 'я'],
  ]);

  let [wordBeforeCryption, setwordBeforeCryption] = useState('');
  let [wordAfterCryption, setwordAfterCryption] = useState('');
  let [upLineBeforeCryption, setupLineBeforeCryption] = useState('')
  let [underLineBeforeCryption, setunderLineBeforeCryption] = useState('')
  let [upLineAfterCryption, setupLineAfterCryption] = useState('')
  let [underLineAfterCryption, setunderLineAfterCryption] = useState('')

  function CopyToClipboard(data: string) : void{
    Clipboard.setString(data);
  }

  function shuffle(){
    const newAlphabet = MyRandomizer.shuffle2DArray([
      ['а','б','в','г','д','е', 'ж', 'з', 'и', 'к'],
      ['л','м','н','о','п','р', 'с', 'т', 'у', 'ф'],
      ['х','ц','ч','ш','щ','ь', 'ы', 'э', 'ю', 'я'],
    ]);
    setalphabet(newAlphabet)
  }
  
  return (
    <View style={styles.main}>
    <ScrollView >
    
    <RoundedButton text="Перемешать" onPress={shuffle}/> 

      <View style={styles.alphabet}>
        {/* 1 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            -
          </Text>
          <Text style={styles.square}>
            1
          </Text>
          <Text style={styles.square}>
            2
          </Text>
          <Text style={styles.square}>
            3
          </Text>
          <Text style={styles.square}>
            4
          </Text>
          <Text style={styles.square}>
            5
          </Text>
          <Text style={styles.square}>
            6
          </Text>
          <Text style={styles.square}>
            7
          </Text>
          <Text style={styles.square}>
            8
          </Text>
          <Text style={styles.square}>
            9
          </Text>
          <Text style={styles.square}>
            0
          </Text>
        </View>
        

        {/* 2 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            1
          </Text>
          <Text style={styles.square}>
          {alphabet[0][0]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][1]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][2]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][3]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][4]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][5]}  
          </Text>
          <Text style={styles.square}>
          {alphabet[0][6]}  
          </Text>
          <Text style={styles.square}>
          {alphabet[0][7]}  
          </Text>
          <Text style={styles.square}>
          {alphabet[0][8]}  
          </Text>
          <Text style={styles.square}>
          {alphabet[0][9]}  
          </Text>
        </View>


        {/* 3 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            2
          </Text>
          <Text style={styles.square}>
            {alphabet[1][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][5]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][6]}  
          </Text>
          <Text style={styles.square}>
            {alphabet[1][7]}  
          </Text>
          <Text style={styles.square}>
            {alphabet[1][8]}  
          </Text>
          <Text style={styles.square}>
            {alphabet[1][9]}  
          </Text>
        </View>


        {/* 4 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            3
          </Text>
          <Text style={styles.square}>
            {alphabet[2][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][5]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][6]}  
          </Text>
          <Text style={styles.square}>
            {alphabet[2][7]}  
          </Text>
          <Text style={styles.square}>
            {alphabet[2][8]}  
          </Text>
          <Text style={styles.square}>
            {alphabet[2][9]}  
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        Исходный текст
      </Text>
      <TextInput 
      onEndEditing={
        ()=>{}}
      onChangeText={(text)=>{setwordBeforeCryption(text)}}
      style={styles.input}/>

      <Text style={styles.title}>
        До умножения
      </Text>
      <Text style={styles.left}>
        {upLineBeforeCryption}
      </Text>
      <Text style={styles.lineBreak}></Text>
      <Text style={styles.left}>
        {underLineBeforeCryption}
      </Text>

      <Text style={styles.title}>
        После умножения
      </Text>
      <Text style={styles.left}>
        {upLineAfterCryption}
      </Text>
      <Text style={styles.lineBreak}></Text>
      <Text style={styles.left}>
        {underLineAfterCryption}
      </Text>
      
      
      <Text style={styles.title}>
        Зашифрованное слово
      </Text>
      <TouchableOpacity onPress={() => CopyToClipboard(wordAfterCryption)}>
        <Text style={styles.display}>{wordAfterCryption}</Text>
      </TouchableOpacity>

      <RoundedButton text="Зашифровать" onPress={()=>{
        Crypter.chaise(alphabet,wordBeforeCryption, setupLineBeforeCryption, 
          setunderLineBeforeCryption, setupLineAfterCryption, 
          setunderLineAfterCryption, setwordAfterCryption)
      }}/>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 5,
    
  },alphabet: {
    flex: 1,
    padding: 25,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,

  },display: {
    minHeight: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  }, square:{
    borderWidth: 1,
    padding: 5,
    height: 40,
    width: 30,
    fontSize: 20,
    textAlign: 'center',
  }, line: {
    display: 'flex',
    flexDirection: 'row',
  }, fit: {
    width: 'fitcontent'
  }, left: {
    textAlign: 'right',
    marginRight: 12,
    marginLeft: 'auto'
  }, lineBreak:{
    height: 1,
    borderWidth: 1,
    width: '100%',
  }
});
