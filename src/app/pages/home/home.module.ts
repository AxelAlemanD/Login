import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsCardComponent } from './components/statistics-card/statistics-card.component';
import { HamburguerMenuComponent } from './components/hamburguer-menu/hamburguer-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage, 
    StatisticsCardComponent, 
    HamburguerMenuComponent
  ]
})
export class HomePageModule {}
