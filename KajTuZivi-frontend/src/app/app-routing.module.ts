import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZemljevidComponent } from './zemljevid/zemljevid.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: ZemljevidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
