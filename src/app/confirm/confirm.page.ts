import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { ProfileServiceService } from "../services/profile-service.service";

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.page.html',
    styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

    public items: any[];

    constructor(
        public router: Router,
        public location: Location,
        private ps: ProfileServiceService
    ) { }

    ngOnInit() {
        this.items = [
            {
                field: "Name",
                value: this.ps.getNameString()
            },
            {
                field: "Birthday",
                value: this.ps.getBirthdayString()
            },
            {
                field: "Cake",
                value: (this.ps.getCakeTypeString() && this.ps.getCakeFrostingString()) ?  `${this.ps.getCakeTypeString()} with ${this.ps.getCakeFrostingString()}` : `Not yet selected.`,
            },
            {
                field: "Gift Ideas",
                value: (this.ps.getGiftIdeasString() !== "" )? this.ps.getGiftIdeasString(): "Not yet selected",
            },
            {
                field: "Gluten Free",
                value: this.ps.getIsGlutenFreeString()
            }
        ];
    }

    onClickPrevious() {
        this.location.back();
    }

    onClickFinish() {
        this.router.navigateByUrl('home');
    }
}
