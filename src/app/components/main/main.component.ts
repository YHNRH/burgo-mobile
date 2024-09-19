import {RelaysVM} from '@/app/viewModels/relaysVM'
import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivityIndicator, getViewById, Page } from '@nativescript/core'
import { ListViewEventData, RadListView } from 'nativescript-ui-listview'

//import { Relay } from '../../models/relayModel'
//import { CouchDB } from '@/app/dal/couch/couchDB'
//import { DbHelper } from '~/app/dal/dbHelper'
import { Router } from '@angular/router'

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  listView:RadListView
  indicator: ActivityIndicator;
  page: any
  vm: RelaysVM

  constructor(private router:Router) {
  }

  async loaded(args): Promise<void> {
    this.page = args.object
    this.indicator = this.page.parent.parent.getViewById("indicator")
    this.listView = this.page.getViewById("listView")
    this.vm = new RelaysVM(this.listView);

    this.listView.items = this.vm.relays;
    this.refresh()

  }


  public onPullToRefreshInitiated(args: ListViewEventData) {
    const that = new WeakRef(this);
    setTimeout(function () {
        that.get().refresh() ;
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }, 1000);
}


  busy(){
    this.indicator.visibility = "visible"
  }

  done(){
    this.indicator.visibility = "collapse"
  }

  async refresh(){
    this.busy();
    this.vm.refresh()
    // .then(res =>{
    // }).catch(e =>{
    //   console.log(e)
    //   this.errorLayout.visibility = "visible"
    // });
    this.done()
  }

  toCreate(){
    this.router.navigateByUrl("create")
  }



}
