import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainComponent } from './components/main/main.component'
import { EditComponent } from './components/edit/edit.component'
import { CreateComponent } from './components/create/create.component'
import { RelayView } from './views/relayView/relayView'
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, NativeScriptUIListViewModule],
  declarations: [AppComponent, MainComponent, RelayView, CreateComponent, EditComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
