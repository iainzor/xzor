import { Component, OnInit } from '@angular/core';

import { GamesService } from './games.service';

@Component({
    selector: "game-list-page",
    templateUrl: "./game-list.component.html"
})
export class GameListComponent implements OnInit
{
    private games:any[] = [];

    constructor(private GamesService:GamesService) {}

    ngOnInit() {
        this.GamesService.loadAll().then(games => { this.games = games; });
    }
}