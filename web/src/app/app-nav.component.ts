import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

import {NotificationsService} from "./notifications/notifications.service";
import {NotificationInterface} from "./notifications/notification.interface";
import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";

@Component({
	selector: "app-nav",
	templateUrl: "./app-nav.component.html",
	styleUrls: ["./app-nav.component.css"]
})
export class AppNavComponent
{
	@Input() account:AccountInterface;
}