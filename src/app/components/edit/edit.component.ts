import { Component } from '@angular/core'

import { RouterExtensions } from '@nativescript/angular'
import { confirm, FlexboxLayout, TextField } from '@nativescript/core';
import { RelayVM } from '~/app/viewModels/relayVM';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
})
export class EditComponent {
  page: FlexboxLayout
  state: any;
  vm:RelayVM
  nameLabel: TextField;
  urlStLabel: TextField;
  urlDLabel: TextField;
  urlELabel: TextField;
  constructor(private router:RouterExtensions) {
    this.state    = this.router.router.getCurrentNavigation().extras.state;

  }

  async loaded(args): Promise<void> {
    this.page = args.object;
    this.vm    = this.state.vm;
    this.nameLabel   = this.page.getViewById<TextField>('name');
    this.urlStLabel  = this.page.getViewById<TextField>('urlSt');
    this.urlELabel   = this.page.getViewById<TextField>('urlE');
    this.urlDLabel   = this.page.getViewById<TextField>('urlD');
    this.nameLabel.text    = this.vm.model.name
  }

  delete(){
    confirm({message: "Are you sure?", okButtonText: "Yes", cancelButtonText: "No"}).then(res =>{
      if (res){
        this.vm.delete()
        this.router.back()
      }
    })
  }

  edit(){
    this.vm.model.name = this.nameLabel.text
    this.vm.edit()
    this.router.back()
  }



}