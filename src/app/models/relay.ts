import { Observable } from "@nativescript/core"
import { Rule } from "./rule"
import { Action } from "./action"
import { Time } from "@angular/common"

export class Relay extends Observable {
  Id:string
  name: string
  status: Status = Status.UNDEFINED
  rules: Array<Rule>;

  constructor(Id: string, name: string, status: string){
    super()
    this.Id     = Id;
    this.name   = name;
    if (status==="ON") 
      this.status = Status.ON;
    else 
      this.status = Status.OFF
  }

  static fromJson(json){
    let r =  new Relay(json.Id, json.Name, json.status);
    r.rules = new Array()
    r.rules.push(new Rule({hours: 1, minutes:2}, new Action("Включить")));
      
    return r
  }

}

export enum Status {
  ON = 1,
  OFF = 0,
  UNDEFINED = -1
}


