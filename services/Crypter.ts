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

  public static chaise(alphabet: string[][], inputString :String,
    upLineBeforeCryption: Function, underLineBeforeCryption: Function,
    upLineAfterCryption: Function, underLineAfterCryption: Function,
    outputString: Function){
    inputString = inputString.replace(/\s+$/, '')
    inputString = inputString.replace(/\s+/g, "_");
    inputString = inputString.toLowerCase();
    inputString = inputString.replace(/[ё]/g, 'е');
    inputString = inputString.replace(/[й]/g, 'и');
    inputString = inputString.replace(/[ъ]/g, 'ь');
    
    
    let alphabetIndexIncrBy1 = [
      [],
      ['', 'а','б','в','г','д','е', 'ж', 'з', 'и', 'к'],
      ['', 'л','м','н','о','п','р', 'с', 'т', 'у', 'ф'],
      ['', 'х','ц','ч','ш','щ','ь', 'ы', 'э', 'ю', 'я'],
    ]

    let words = inputString.split('_');

    let upCodeBeforeCryption ='';
    let underCodeBeforeCryption ='';

    words.forEach(word=>{
      let wordCode =''
      for (let i = 0; i < word.length; i++) {
        const element = this.searchIndex(word[i], alphabet) ;
        wordCode = wordCode.concat(element)
      }
      let upCode = '';
      let underCode = '';
      for (let i = 0; i < wordCode.length; i = i+2) {
        
        upCode = upCode.concat(wordCode[i])
        underCode = underCode.concat(wordCode[i+1])
      }
      upCodeBeforeCryption = upCodeBeforeCryption.concat(upCode);
      underCodeBeforeCryption = underCodeBeforeCryption.concat(underCode);
      upCodeBeforeCryption = upCodeBeforeCryption.concat(' ');
      underCodeBeforeCryption = underCodeBeforeCryption.concat(' ');
    })
    upCodeBeforeCryption = upCodeBeforeCryption.substring(0, upCodeBeforeCryption.length-1)
    underCodeBeforeCryption = underCodeBeforeCryption.substring(0, underCodeBeforeCryption.length-1)
    // 101 0112  upCodeBeforeCryption
    // 056 5675  underCodeBeforeCryption
    upCodeBeforeCryption = this.incrNumbersWithSpaces(upCodeBeforeCryption);
    underCodeBeforeCryption = this.incrNumbersWithSpaces(underCodeBeforeCryption);

    upLineBeforeCryption(upCodeBeforeCryption);
    underLineBeforeCryption(underCodeBeforeCryption);
    
    
    let underNumsAfterCryption = underCodeBeforeCryption.split(' ');
    underNumsAfterCryption = underNumsAfterCryption.map(num=>{
      return (+num*9).toString();
    })
    let upNumsAfterCryption = upCodeBeforeCryption.split(' ');
    const PLACEHOLDER = '1'

    for (let i = 0; i < upNumsAfterCryption.length; i++) {
      if (upNumsAfterCryption[i].length != underNumsAfterCryption[i].length){
        upNumsAfterCryption[i] = PLACEHOLDER + upNumsAfterCryption[i];
      }
    }

    let queryUp = upNumsAfterCryption.join(' ');
    queryUp = queryUp.replace(/\s+$/, '')
    let queryUnder = underNumsAfterCryption.join(' ');
    queryUnder = queryUnder.replace(/\s+$/, '')

    upLineAfterCryption(queryUp)
    underLineAfterCryption(queryUnder);
    
    let decodeIndexes: string[] = [];
    for (let i = 0; i < queryUp.length; i++) {
      decodeIndexes = decodeIndexes.concat(`${queryUp[i]}${queryUnder[i]}`)
    }

    let cryptedWord ='';

    for (let i = 0; i < decodeIndexes.length; i++) {
      const element = decodeIndexes[i].replace(/\s+/g, ' ');
      let coordLeft = (element[0] == '0') ? '10': element[0];
      let coordRigth = (element[1] == '0') ? '10': element[1];

      if (element === ' '){
        cryptedWord = cryptedWord.concat(" ")
      } else {
        cryptedWord = cryptedWord.concat(alphabetIndexIncrBy1[+coordLeft][+coordRigth]);
      }
    }

    outputString(cryptedWord);
  }

  private static searchIndex(element: string | number, array: string[][] | number[][]): string{
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array[i].length; j++){
        if (element === array[i][j]){
          return `${i}${j}`;
        }
      }
    }
    return ` `
  }

  private static incrNumbersWithSpaces(inputString: string){
    let output = ''
    for (let i = 0; i < inputString.length; i++) {
      const element = inputString[i];
      if(element === " "){
        output = output.concat(" ")
      } else {
        let number = (+element+1).toString()
        if (number == '10'){
          number = '0';
        }
        output = output.concat(number)
      }
    }
    return output;
  }
}


export default Crypter;

