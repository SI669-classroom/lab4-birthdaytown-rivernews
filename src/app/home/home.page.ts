import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from "@angular/router";

import { AlertController } from '@ionic/angular';

import { ProfileServiceService } from "../services/profile-service.service";

import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public name: string;
    public isBirthday: boolean = false;

    constructor(
        public router: Router,
        public alertController: AlertController,
        private ps: ProfileServiceService,
        private storage: Storage,

        private ngZone: NgZone
    ) {

    }

    ngOnInit() {
        this.ps.profileDidLoaded.then(() => {
            this.name = this.ps.getNameString();
        
            let birthday: Date = this.ps.birthday;
            let today = new Date(Date.now());
    
            console.log(`what is birtheday`, birthday);
    
            if (
                this.ps.getBirthdayString() !== "Not provided" &&
                birthday.getDate() == today.getDate() &&
                birthday.getMonth() == today.getMonth()
            ) {
                this.isBirthday = true;
            }
        });
    }

    onClickEditProfile() {
        this.router.navigateByUrl('/about-me');
    }

    async confirmResetProfile() {
        const alert = await this.alertController.create({
            header: 'Are you sure?',
            message: 'All your profile data will be cleared.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'OK',
                    handler:  () => {
                        this.storage.clear().then(async () => {
                            this.ps.reset();
                            this.ngZone.run(async () => { 
                                /** see issue https://github.com/angular/angular/issues/18254 */
                                /** see ngZone here https://stackoverflow.com/questions/35936535/angular-2-ngoninit-not-called */
                                await this.router.navigate(['/']);
                            });
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
