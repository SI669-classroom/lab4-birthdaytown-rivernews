import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    public isFirstTime: boolean = true;

    constructor(
        public router: Router,
        private storage: Storage
    ) {
        this.storage.get("isFirstTime").then(
            (rs) => {
                if (rs == null) {
                    this.isFirstTime = true;
                    this.storage.set("isFirstTime", true);
                } else {
                    this.isFirstTime = false;
                    this.storage.set("isFirstTime", false);
                    this.router.navigateByUrl('home');
                }
            }
        )
    }

    ngOnInit() {
    }

    onClickGetStarted() {
        this.router.navigateByUrl('about-me');
    }

}
