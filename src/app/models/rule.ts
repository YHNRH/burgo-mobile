import { Time } from "@angular/common";
import { Observable } from "@nativescript/core"
import { Action } from "./action";

export class Rule extends Observable{

    constructor(time: Time, action: Action){
        super()
        this.time = time
        this.action = action
    }
    time: Time;
    action: Action 

}