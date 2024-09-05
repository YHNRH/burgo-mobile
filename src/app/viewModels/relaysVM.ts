import { Injectable } from '@angular/core'
import { Http, ObservableArray } from '@nativescript/core'
import { getString } from '@nativescript/core/application-settings'
import { valueFieldProperty } from '@nativescript/core/ui/list-picker/list-picker-common'
import { Relay } from '../models/relayModel'

import { RelayVM } from './relayVM'
import { DbHelper } from '@/app/dal/dbHelper'
import { RadListView } from 'nativescript-ui-listview'


export class RelaysVM {

  relays:ObservableArray<RelayVM> = new ObservableArray();
  //private db:DbHelper
  container: RadListView
  constructor(//db:DbHelper,
     container){
    //this.db = db;
    this.container = container
  }
  refresh(){
    this.relays.splice(0)
    Http.request({
      method: 'GET',
      url:'http://burgo.sarkofiton.keenetic.link/api/get'
    }).then(response =>{
      var result = response.content.toJSON()
      result.forEach(relay => {
        let vm = new RelayVM(Relay.fromJson(relay));
        vm.model.addEventListener("stateChange", ()=>{
          this.container.refresh();
        })
        this.relays.push(vm);      
        vm.update();
      });



      //this.model.notify({eventName:"stateChange"});

      // this.model.status = parseInt(response.content.toString())
      // this.model.notifyPropertyChange("","")
    }).catch(e => {
      console.log(e)

      var a = 2
      //this.model.status = Status.UNDEFINED
     // this.model.notify({eventName:"stateChange"});
    })

    //let result = this.db.select("relays")

  }

  add(relay){
    // this.relays.push(relay);
    //return this.db.insert("",relay);
  }

}
