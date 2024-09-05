import {RelaysVM} from '@/app/viewModels/relaysVM'
import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivityIndicator, getViewById, GridLayout, Page, TextField } from '@nativescript/core'
import { ListViewEventData, RadListView } from 'nativescript-ui-listview'

import { Relay } from '../../models/relayModel'
import { CouchDB } from '@/app/dal/couch/couchDB'
import { DbHelper } from '~/app/dal/dbHelper'
import { Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
})
export class CreateComponent {

  page: GridLayout
  vm: RelaysVM

  constructor(private router:RouterExtensions) {
    let db = new CouchDB() as DbHelper
    this.vm = new RelaysVM(//db,
       undefined);
  }

  async loaded(args): Promise<void> {
    this.page = args.object
  }

  create(){
    let model = new Relay(
      this.page.getViewById<TextField>('name').text,
      this.page.getViewById<TextField>('urlSt').text,
      this.page.getViewById<TextField>('urlE').text,
      this.page.getViewById<TextField>('urlD').text,
      ""
    );
    console.log(this.vm.add(model.toDbObject()));
    this.router.back();
  }



}
