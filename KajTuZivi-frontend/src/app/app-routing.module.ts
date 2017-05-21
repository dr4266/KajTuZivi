import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZemljevidComponent } from './zemljevid/zemljevid.component';
import { VnosPodatkovComponent } from './vnos-podatkov/vnos-podatkov.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: ZemljevidComponent },
  { path: 'data/input/:kvadrant', component: VnosPodatkovComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
