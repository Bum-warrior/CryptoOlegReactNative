import IPoint from "../Interfaces/IPoint";
import Dictionary from "./Dictionary";
import MyRandomizer from "./MyRandomizer";

class Crypter{
  
  //шифр перестановки
  public static permutation(inputString :String, setKey : Function, setAsnwer : Function){
    //append 1 if cant divide by 2
    inputString = inputString.replace(/ +/g, "_");
    if(inputString.length%2===1){
      inputString = inputString + '1';
    }

    let splitedString = inputString.match(/.{1,2}/g);
    //[ 'MA', 'KA', 'RO', 'N1' ]
    let dict = new Dictionary();
    //create Dictionary with records
    splitedString?.forEach(item => {
      dict.addElement({word: item})
    })
    
    let records = dict.getRecords();
    let key : number[] | string[]= MyRandomizer.generateKey(records.length);
    let answer : string = "";
    key.forEach(i => {
      answer = answer.concat(records[i].word.toString());
    })
    key = key.map(function(val){return ++val});
    
    setKey(key.join(","));
    setAsnwer(answer);
  }

  public static polybius(alphabet: string[][], inputString :String, setKeyBeforeCryption : Function, setKeyAfterCryption: Function, setWordAfterCryption : Function){
    inputString = inputString.replace(/\s+/g, "_");
    inputString = inputString.toLowerCase();
    let keysBeforeCryption: string [] = [];
    for(let i = 0; i < inputString.length; i++){
      keysBeforeCryption.push(this.searchIndex(inputString[i], alphabet))
      //[ '30', '00', '31', '00', '22', '00' ]
    }

    //output for UI
    let keyBeforeCryptionUI = keysBeforeCryption.map(element=>{
      return `${+element[0]+1}${+element[1]+1}`
    })
    setKeyBeforeCryption(keyBeforeCryptionUI.join('.'));

    let keyAfterCryprion = keysBeforeCryption.join('');
    keyAfterCryprion = keyAfterCryprion.concat(keyAfterCryprion[0]);
    keyAfterCryprion = keyAfterCryprion.substring(1);
    // split by 2
    let keysAfterCryption = keyAfterCryprion.match(/.{2}/g);
    //[ '00', '03', '10', '02', '20', '03' ]
    
    //output for UI
    let keysAfterCryptionUI = keysAfterCryption?.map(element=>{
      return `${+element[0]+1}${+element[1]+1}`
    })
    setKeyAfterCryption(keysAfterCryptionUI?.join('.'));

    let wordAfterCryption = '';
    keysAfterCryption?.forEach(elem=>{
      wordAfterCryption = wordAfterCryption.concat(alphabet[+elem[0]][+elem[1]])
    })
    setWordAfterCryption(wordAfterCryption);
  }

  private static searchIndex(element: string | number, array: string[][] | number[][]): string{
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array[i].length; j++){
        if (element === array[i][j]){
          return `${i}${j}`;
        }
      }
    }
    return `ERROR`
  }
}


export default Crypter;

