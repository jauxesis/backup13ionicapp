import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedlistsPage } from './sharedlists';

@NgModule({
  declarations: [
    SharedlistsPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedlistsPage),
  ],
})
export class SharedlistsPageModule {}
