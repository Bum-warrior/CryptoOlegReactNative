import Dictionary from "./Dictionary";
import MyRandomizer from "./MyRandomizer";

class Crypter{
  
  //шифр перестановки
  public permutation(inputString :String, setKey : Function, setAsnwer : Function){
    //append 1 if cant divide by 2
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
    let key = MyRandomizer.generateKey(records.length);
    let answer : string = "";
    key.forEach(i => {
      answer = answer.concat(records[i].word.toString())
    })
    key = key.map(function(val){return ++val});
    
    setKey(key);
    setAsnwer(answer);
  }
}


export default Crypter;

