import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GameListComponent } from './game-list.component';
import { GamesService } from './games.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: GameListComponent }
    ])
  ],
  declarations: [
    GameListComponent
  ],
  providers: [
    GamesService
  ]
})
export class GamesModule { }
