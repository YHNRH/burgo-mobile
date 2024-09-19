import { Http } from "@nativescript/core";
import { Relay, Status } from "../models/relay";
import { Config } from "../common/config";

export class RelayVM {


  model:Relay
  constructor(model:Relay){
    this.model = model;
  }

  delete() {
    //this.db.delete("", this.model.dbId)
  }

  edit() { 
    //this.db.update("", this.model.dbId, this.model.toDbObject())
    let url = Config.url;
    url += 'api/updatedevice?Id=' + this.model.Id + '&name=' + this.model.name
    console.log(url)
    Http.request({
      method: 'POST',
      url:url
    }).then(response =>{
      console.dir(response)
      
    })
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
    let url = Config.url;
    switch(this.model.status){
      case Status.UNDEFINED:
      break;
      case Status.ON:
        url += 'api/switchstate?Id='+this.model.Id+'&RELAY=OFF'
      break;
      case Status.OFF:
        url += 'api/switchstate?Id='+this.model.Id+'&RELAY=ON'
      break;
    }
      Http.request({
      method: 'POST',
      url:url
    }).then(response =>{
      switch(JSON.parse(response.content.toJSON()).status){
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
