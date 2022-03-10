import * as React from 'react';
import { Button, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import { Text, View } from '../components/Themed';
import RoundedButton from '../components/RoundedButton';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import MyRandomizer from '../services/MyRandomizer';

export default function CryptionTritemiusScreen({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) {
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

  return (
    <View style={styles.main}>
    <ScrollView >

      
      <Text style={styles.title}>
        Исходный текст
      </Text>
      <TextInput 
      onChangeText={(text)=>{
          setwordBeforeCryption(text);
          setwordAfterCryption(Crypter.Tritemius(text))
        }}
      style={styles.input}/>

      <Text style={styles.left}>
        {underLineAfterCryption}
      </Text>
      
      
      <Text style={styles.title}>
        Зашифрованное слово
      </Text>
      <TouchableOpacity onPress={() => CopyToClipboard(wordAfterCryption)}>
        <Text style={styles.display}>{wordAfterCryption}</Text>
      </TouchableOpacity>

      <RoundedButton text="Зашифровать" onPress={() => {
        setwordAfterCryption(Crypter.Tritemius(wordBeforeCryption))
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
