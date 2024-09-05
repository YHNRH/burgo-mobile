import { Observable } from "@nativescript/core"

export class Relay extends Observable {
  dbId:string
  name: string
  status: Status = Status.UNDEFINED

  urlSt
  urlE
  urlD

  constructor(name, urlSt, urlE, urlD, status){
    super()
    this.name   = name;
    this.urlD = urlD;
    this.urlE = urlE;
    this.urlSt = urlSt;
    if (status==="ON") 
      this.status = Status.ON;
    else 
      this.status = Status.OFF
  }
  static fromJson(json){
    
    let r =  new Relay(json.addr, json.addr, json.addr, json.addr, json.status);
    r.dbId = json._id;
    return r
  }

  toDbObject(){
    return { urlSt: this.urlSt, urlD: this.urlD, urlE: this.urlE, name: this.name}
  }

}

export enum Status {
  ON = 1,
  OFF = 0,
  UNDEFINED = -1
}


