import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebugComponent } from './components/debug/debug.component';
import { CustomActionLinkComponent } from './components/custom-action-link/custom-action-link.component';
import { FlatFileImportComponent } from './components/flat-file-import/flat-file-import.component';
;
const routes: Routes = [
 
  { path: '', component: FlatFileImportComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
