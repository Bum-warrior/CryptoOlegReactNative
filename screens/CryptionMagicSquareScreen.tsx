import * as React from 'react';
import { Button, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import { Text, View } from '../components/Themed';
import RoundedButton from '../components/RoundedButton';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import MyRandomizer from '../services/MyRandomizer';

export default function CryptionMagicSquareScreen({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) {

  let [wordBeforeCryption, setwordBeforeCryption] = useState('');
  const [wordAfterCryption, setwordAfterCryption] = useState('')
  const [squaresViews, setsquaresViews] = useState();

  function Crypt(){
    let cryptedData = Crypter.MagicSquare(wordBeforeCryption);
    let arrayOfSquares = cryptedData?.squares;
    if(cryptedData?.finalWord){
      setwordAfterCryption(cryptedData.finalWord)
    }
    let tempSquareView = [];
    if(arrayOfSquares){
      for(let i = 0; i< arrayOfSquares?.length; i++){
        const oneSquare = arrayOfSquares[i];
        tempSquareView.push(
        <View style={styles.oneSquare} key={i}>
          {/* 1 */}
          <View style={styles.line}>
            <Text style={styles.square}>
              {oneSquare[0][0]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[0][1]} 
            </Text>
            <Text style={styles.square}>
              {oneSquare[0][2]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[0][3]}
            </Text>
          </View>
          

          {/* 2 */}
          <View style={styles.line}>
            <Text style={styles.square}>
              {oneSquare[1][0]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[1][1]} 
            </Text>
            <Text style={styles.square}>
              {oneSquare[1][2]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[1][3]}
            </Text>
          </View>

          {/* 3 */}
          <View style={styles.line}>
            <Text style={styles.square}>
              {oneSquare[2][0]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[2][1]} 
            </Text>
            <Text style={styles.square}>
              {oneSquare[2][2]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[2][3]}
            </Text>
        </View>


          {/* 4 */}
          <View style={styles.line}>
            <Text style={styles.square}>
              {oneSquare[3][0]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[3][1]} 
            </Text>
            <Text style={styles.square}>
              {oneSquare[3][2]}
            </Text>
            <Text style={styles.square}>
              {oneSquare[3][3]}
            </Text>
          </View>
        </View>
        )
      }
    }
    //@ts-ignore
    setsquaresViews(tempSquareView)
    
  }

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
        onEndEditing={
          ()=>{}}
        onChangeText={(text)=>{setwordBeforeCryption(text)}}
        style={styles.input}/>
        <Text style={styles.title}>
          Квадраты
        </Text>
        <Text style={styles.lineBreak}></Text>
        {squaresViews}
        <Text style={styles.lineBreak}></Text>
        <Text style={styles.title}>
          Зашифрованное слово
        </Text>
        <TouchableOpacity onPress={() => CopyToClipboard(wordAfterCryption)}>
          <Text style={styles.display}>{wordAfterCryption}</Text>
        </TouchableOpacity>

        <RoundedButton text="Зашифровать" onPress={()=>{
          Crypt()
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
    
  },oneSquare: {
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
