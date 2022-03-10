import IPoint from "../Interfaces/IPoint";

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

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static shuffle2DArray(inputArray: string[][]): string[][]{
    let xSize = inputArray.length;
    let ySize = inputArray[0].length;
    for(let i = 0; i < 20; i++){
      let first : IPoint = {x: this.getRandomInt(xSize), y: this.getRandomInt(ySize)}
      let second : IPoint = {x: this.getRandomInt(xSize), y: this.getRandomInt(ySize)}

      let buffer = inputArray[first.x][first.y];
      inputArray[first.x][first.y] = inputArray[second.x][second.y];
      inputArray[second.x][second.y] = buffer;
    }
    return inputArray;
  }
}

export default MyRandomizer;