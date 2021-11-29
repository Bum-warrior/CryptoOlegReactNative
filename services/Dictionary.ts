import IRecord from "../Interfaces/IRecord";

class Dictionary{
  records : IRecord[];
  shuffledRecords? : IRecord[];

  constructor(){
    this.records = [];
  }
  
  addElement(item: IRecord){
    this.records.push(item);
  }

  getRecords(){
    return this.records;
  }
}

export default Dictionary;