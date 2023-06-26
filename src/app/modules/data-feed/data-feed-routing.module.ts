import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFeedComponent } from './data-feed.component';

const routes: Routes = [
  { path: '', component: DataFeedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFeedRoutingModule { }
