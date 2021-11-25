import Dictionary from "./Dictionary";

class Crypt{
  
  //шифр перестановки
  permutation(inputString :String){
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
    console.log("ключ:" + key);
    console.log("ответ:" + answer);
  }
}




class MyRandomizer {
  static generateKey(maxNumber : number){
    let numbers : number[] = [];
    let rndNumbers : number[] = [];
    // create array with uniq numbers in range maxNumber
    for(let i = 0; i<maxNumber; i++) numbers.push(i);
    let iterations = numbers.length;
    //select element in numbers and add it to rndNumbers
    while(iterations--){
      let index = Math.floor(Math.random() * (iterations+1))
      rndNumbers.push(numbers[index]);
      numbers.splice(index, 1);
    }
    return rndNumbers;
  }

  static getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}

///////////////////////////

let test = new Crypt();
test.permutation("MAKARON")


