import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { AlertController } from '@ionic/angular';

import { ProfileServiceService } from "../services/profile-service.service";

@Component({
    selector: 'app-my-gift-ideas',
    templateUrl: './my-gift-ideas.page.html',
    styleUrls: ['./my-gift-ideas.page.scss'],
})
export class MyGiftIdeasPage implements OnInit {

    public giftItems: any[] = [];

    constructor(
        public router: Router,
        public location: Location,
        public alertController: AlertController,
        private ps: ProfileServiceService
    ) { }

    ngOnInit() {
        console.log("did't you load again?", this.ps.giftIdeas);
        this.giftItems = this.ps.giftIdeas;
    }

    onClickPrevious() {
        this.location.back();
    }

    onClickNext() {
        this.router.navigateByUrl('confirm');
    }

    onChechboxChange(giftItem: any) {
        this.ps.giftIdeas = this.giftItems;
    }

    // API: https://beta.ionicframework.com/docs/api/alert#properties
    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Add gift item',
            message: `Give this very important person some surprise...!`,
            inputs: [
                {
                    name: 'gift-item-title',
                    type: 'text',
                    placeholder: 'Hand-made cookie'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (d) => {
                        console.log('cancelled', d);
                        
                    }
                }, {
                    text: 'OK',
                    handler: (d) => {
                        let giftTitle = d[`gift-item-title`];
                        this.giftItems.push({
                            title: giftTitle,
                            isChecked: true
                        })

                        this.ps.giftIdeas = this.giftItems;
                    }
                }
            ]
        });

        await alert.present();
    }

    public deleteGiftIdea(giftIdea: any): void {
        let index = this.giftItems.findIndex((d) => d.title === giftIdea.title);
        if (index > -1) {
            this.giftItems.splice(index, 1);
        }
    }

}
