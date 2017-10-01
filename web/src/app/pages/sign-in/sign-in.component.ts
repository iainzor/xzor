import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from  "@angular/router";
import {Subscription} from "rxjs";

import {AccountInterface} from "../../account/account.interface";
import {NotificationsService} from "../../notifications/notifications.service";

@Component({
	selector: "pages-sign-in",
	templateUrl: "./sign-in.component.html",
	styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit, OnDestroy
{
	private paramsSub:Subscription;
	private redirectTo:string = "";

	constructor(
		private Route:ActivatedRoute, 
		private Router:Router,
		private Notifications:NotificationsService
	) {}

	ngOnInit() {
		this.paramsSub = this.Route.queryParams.subscribe((params) => {
			this.redirectTo = params.redirectTo || "";
		});
	}

	ngOnDestroy() {
		this.paramsSub.unsubscribe();
	}

	onSignIn(account:AccountInterface) {
		this.Notifications.push({
			title: "Success",
			message: "You were signed in successfully"
		});
		console.log("Navigating to /"+ this.redirectTo);
		this.Router.navigateByUrl("/"+ this.redirectTo);
	}
}