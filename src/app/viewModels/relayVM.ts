import { Http } from "@nativescript/core";
//import { DbHelper } from "../dal/dbHelper";
import { Relay, Status } from "../models/relayModel";

export class RelayVM {


  model:Relay
  //db:DbHelper
  constructor(model:Relay
    //, db:DbHelper
    ){
    this.model = model;
    //this.db = db
  }

  delete() {
    //this.db.delete("", this.model.dbId)
  }

  edit() { 
    //this.db.update("", this.model.dbId, this.model.toDbObject())
  }

  update() {
    //let url =""
    //console.log("this.model.status " + this.model.status)
    //console.dir(this.model)
    // switch(this.model.status){
    //   case Status.UNDEFINED:
    //     url = this.model.urlSt
    //   break;
    //   case Status.ON:
    //     url = this.model.urlD
    //   break;
    //   case Status.OFF:
    //     url = this.model.urlE
    //   break;
    // }

    //   Http.request({
    //   method: 'GET',
    //   url:url
    // }).then(response =>{
    //   switch(response.content.toString()){
    //     case '0':
    //       this.model.status = Status.OFF
    //     break;
    //     case '1':
    //       this.model.status = Status.ON
    //     break;
    //     case '-1':
    //       this.model.status = Status.UNDEFINED
    //     break;
    //   }
      this.model.notify({eventName:"stateChange"});

      // this.model.status = parseInt(response.content.toString())
      // this.model.notifyPropertyChange("","")
    // }).catch(e => {
    //   this.model.status = Status.UNDEFINED
    //   this.model.notify({eventName:"stateChange"});
    // })

  }

  switchState(){
    let url = ""
    switch(this.model.status){
      case Status.UNDEFINED:
        url = 'http://' + this.model.urlSt
      break;
      case Status.ON:
        url = 'http://' + this.model.urlD + '/RELAY=OFF'
      break;
      case Status.OFF:
        url = 'http://' + this.model.urlE + '/RELAY=ON'
      break;
    }
    console.dir('test5')
      Http.request({
      method: 'GET',
      url:url
    }).then(response =>{
      switch(response.content.toJSON().status){
        case 'OFF':
          this.model.status = Status.OFF
        break;
        case 'ON':
          this.model.status = Status.ON
        break;
        default:
          this.model.status = Status.UNDEFINED
        break;
      }
    this.model.notify({eventName:"stateChange"});

    //this.model.status = parseInt(response.content.toString())
    this.model.notifyPropertyChange("","")
  }).catch(e => {
    console.log(e)
    this.model.status = Status.UNDEFINED
    this.model.notify({eventName:"stateChange"});
  })
  }
}
