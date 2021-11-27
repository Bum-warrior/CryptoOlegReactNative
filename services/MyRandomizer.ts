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

export default MyRandomizer;