import { Http, ObservableArray } from '@nativescript/core'
import { Relay } from '../models/relay'
import { RelayVM } from './relayVM'
import { Config } from '../common/config'
import { RadListView } from 'nativescript-ui-listview'


export class RelaysVM {

  relays:ObservableArray<RelayVM> = new ObservableArray();
  container: RadListView
  constructor(container: RadListView){
    this.container = container
  }


  refresh(){
    this.relays.splice(0)
    Http.request({
      method: 'GET',
      url: Config.url + 'api/getudp'
    }).then(response =>{
      console.dir(response)
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
