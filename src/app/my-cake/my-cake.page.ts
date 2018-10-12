import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { ProfileServiceService } from "../services/profile-service.service";

@Component({
    selector: 'app-my-cake',
    templateUrl: './my-cake.page.html',
    styleUrls: ['./my-cake.page.scss'],
})
export class MyCakePage implements OnInit {

    public cakeType: string;
    public cakeFrosting: string;
    public isGlutenFree: boolean;

    constructor(
        public router: Router,
        public location: Location,
        public ps: ProfileServiceService
    ) { }

    ngOnInit() {
        this.cakeType = this.ps.cakeType;
        this.cakeFrosting = this.ps.cakeFrosting;
        this.isGlutenFree = this.ps.isGlutenFree;
    }

    onCakeTypeChange($event) {
        this.ps.cakeType = this.cakeType = $event;
    }

    onCakeFrostingChange($event) {
        this.ps.cakeFrosting = this.cakeFrosting = $event;
    }

    onCakeGlutenFreeChange($event) {
        this.ps.isGlutenFree = this.isGlutenFree = $event;
    }

    onClickPrevious() {
        this.location.back();
    }

    onClickNext() {
        this.router.navigateByUrl('my-gift-ideas');
    }

}
