import IPoint from "../Interfaces/IPoint";
import Dictionary from "./Dictionary";
import MyRandomizer from "./MyRandomizer";

class Crypter{
  public static blockPermutation(inputString :String, keyString: string){
    const numericKey = keyString.split('');
    //[ '1', '2', '3', '4' ]
    
    let chunkRegex = new RegExp(`.{${numericKey.length}}`, 'g');
    //append 1 if cant divide by ley length
    inputString = inputString.replace(/ +/g, "_");
    if(inputString.length%numericKey.length!==0){
      for(let i = 0; i < (inputString.length%numericKey.length); i++){
        inputString = inputString + '_';
      }
    }
    
    let chunks = inputString.match(chunkRegex);
    let cryptedChunksArray : string [] = [];
    //[ 'MA', 'KA', 'RO', 'N1' ]
    chunks?.map((chunk) => {
      let dict = new Dictionary();
      let splitedString = chunk.split('');
      let keyForLetter = 0;
      splitedString?.forEach(item => {
        dict.addElement({word: item, key: keyForLetter})
        ++keyForLetter;
      })
      let records = dict.getRecords();
      let key = numericKey.map((letter) => {
        let numb = Number(letter)
        let key = numb - 1;
        return key
      });
      let cryptedChunk = new Array<string>(key.length);
      records.map((record, index) => {
        cryptedChunk[key[index]] = record.word;
      })
      cryptedChunksArray.push(cryptedChunk.join(''))
    })
    return cryptedChunksArray.join('|')
  }

  public static blockPermutationReverse(inputString :String, keyString: string){
    const numericKey = keyString.split('');
    //[ '1', '2', '3', '4' ]
    
    let chunkRegex = new RegExp(`.{${numericKey.length}}`, 'g');
    //append 1 if cant divide by ley length
    inputString = inputString.replace(/ +/g, "_");
    if(inputString.length%numericKey.length!==0){
      for(let i = 0; i < (inputString.length%numericKey.length); i++){
        inputString = inputString + '_';
      }
    }
    
    let chunks = inputString.match(chunkRegex);
    let cryptedChunksArray : string [] = [];
    //[ 'MA', 'KA', 'RO', 'N1' ]
    chunks?.map((chunk) => {
      let dict = new Dictionary();
      let splitedString = chunk.split('');
      let keyForLetter = 0;
      splitedString?.forEach(item => {
        dict.addElement({word: item, key: keyForLetter})
        ++keyForLetter;
      })
      let records = dict.getRecords();
      
      let key = numericKey.map((letter) => {
        let numb = Number(letter)
        let key = numb - 1;
        return key
      });
      
      let cryptedChunk = new Array<string>(key.length);
      key.map((key, index) => {
        cryptedChunk[index] = records[key].word;
      })
      cryptedChunksArray.push(cryptedChunk.join(''))
    })
    return cryptedChunksArray.join('|')
  }
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

  public static MagicSquare(startString: string){
    
    
    let squares = [];
    let stringForSquare = startString.match(/.{1,16}/g)

    if(stringForSquare !== null){
      for(let i = 0; i < stringForSquare?.length; i++){
        const stringForOneSquare = stringForSquare[i];
        let tempField = this.getField4x4();
        for(let i=0; i < stringForOneSquare.length; i++){
          const symbol = stringForOneSquare[i];
          switch (i) {
            
            case 0:
              tempField[3][3] = symbol;
              break;
            case 1:
              tempField[0][2] = symbol;
              break;
            case 2:
              tempField[0][1] = symbol;
              break;
            case 3:
              tempField[3][0] = symbol;
              break;
            case 4:
              tempField[1][0] = symbol;
              break;
            case 5:
              tempField[2][1] = symbol;
              break;
            case 6:
              tempField[2][2] = symbol;
              break;
            case 7:
              tempField[1][3] = symbol;
              break;
            case 8:
              tempField[2][0] = symbol;
              break;
            case 9:
              tempField[1][1] = symbol;
              break;            
            case 10:
              tempField[1][2] = symbol;
              break;
            case 11:
              tempField[2][3] = symbol;
              break;            
            case 12:
              tempField[0][3] = symbol;
              break;
            case 13:
              tempField[3][2] = symbol;
              break;            
            case 14:
              tempField[3][1] = symbol;
              break;
            case 15:
              tempField[0][0] = symbol;
              break;
            default:
              break;  
          }
        }
        squares.push(tempField)
      }
      let finalWord : string= '';
      squares.map((oneSquare) => {
        oneSquare.map((oneLine) => {
          finalWord = finalWord + oneLine.join('')
        })
      })
      return {squares, finalWord};
    }
  }

  public static Tritemius(startString: string){
    startString = startString.toLowerCase();
    if(startString !== null){
      let finalStringOfGroup = '';
      let letterNumber = 1;
        for(let i =0; i< startString.length; i++){
          const letter = startString[i];
          switch (letter) {
            case ' ':
              finalStringOfGroup += letter
              break;
            case '.':
              finalStringOfGroup += letter
              break;
            case ',':
              finalStringOfGroup += letter
              break;
            case '!':
              finalStringOfGroup += letter
              break;
            case '-':
              finalStringOfGroup += letter
              break;
            case ':':
              finalStringOfGroup += letter
              break;
            case ';':
              finalStringOfGroup += letter
              break;
            case '"':
              finalStringOfGroup += letter
              break;
            case '\'':
              finalStringOfGroup += letter
              break;
            default:
              
              finalStringOfGroup += this.RotateSymbolByN(letter, letterNumber);
              letterNumber++;
              if(letterNumber === 34) letterNumber = 1;
              break;
          }
        }
        return(finalStringOfGroup)
    }
    return ''
  }

  private static RotateSymbolByN(symbol: string, n: number){
    const usualAlphabet = ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я', 'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
    let firstIndex = usualAlphabet.indexOf(symbol);
    let newLetter = usualAlphabet[firstIndex+n];
    return newLetter;
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

  private static getField4x4(){
    return [
      ['','','',''],
      ['','','',''],
      ['','','',''],
      ['','','',''],
    ]
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

