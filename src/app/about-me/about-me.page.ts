import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { ProfileServiceService } from "../services/profile-service.service";

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.page.html',
    styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage implements OnInit {

    public name: string;
    public birthdayUIValue: any = "";

    constructor(
        private location: Location,
        private router: Router,
        private ps: ProfileServiceService
    ) { }

    ngOnInit() {
        console.log("are we in init about-me?");
        this.name = this.ps.name;
        if (this.ps.birthday instanceof Date) {
            this.birthdayUIValue = this.ps.birthday.toISOString();
        } else {
            this.birthdayUIValue = {};
        }
    }

    onNameChange() {
        this.ps.name = this.name;
    }

    onBirthdayChange($event) {
        console.log("birth change", $event)
        this.ps.birthday = new Date($event.year.value, $event.month.value - 1, $event.day.value)
        
        this.birthdayUIValue = $event;
    }

    onClickPrevious() {
        this.location.back();
    }

    onClickNext() {
        this.router.navigateByUrl('my-cake');
    }
}
