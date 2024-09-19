import { Component, Inject, Input, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular';
import { RelayVM } from '~/app/viewModels/relayVM';
import { MainComponent } from '../../components/main/main.component';

import { Status } from '../../models/relay'

@Component({ 
  selector: 'relay',
  templateUrl: './relayView.html',
  styleUrls: ['./relayView.css']
})


export class RelayView {
  @Input() vm: RelayVM;
  status = Status
  constructor(@Inject(MainComponent) private mainComponent: MainComponent, private router: RouterExtensions){}

  toEdit(){
    this.router.navigate(["edit"], {state: {vm: this.vm}})
  }
}
