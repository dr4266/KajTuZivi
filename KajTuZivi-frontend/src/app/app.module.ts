import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ZemljevidComponent } from './zemljevid/zemljevid.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { VnosPodatkovComponent } from './vnos-podatkov/vnos-podatkov.component';
import { KvadrantPodrobnoComponent } from './zemljevid/kvadrant-podrobno/kvadrant-podrobno.component';
import { VrstePodrobnoComponent } from './zemljevid/vrste-podrobno/vrste-podrobno.component';
import { PodrobnostiComponent } from './podrobnosti/podrobnosti.component';

@NgModule({
  declarations: [
    AppComponent,
    ZemljevidComponent,
    VnosPodatkovComponent,
    KvadrantPodrobnoComponent,
    VrstePodrobnoComponent,
    PodrobnostiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
