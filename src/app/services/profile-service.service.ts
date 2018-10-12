import { Injectable } from '@angular/core';

import { Profile } from "../data-model-classes/profile";

import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class ProfileServiceService {

    private profile: Profile;

    public profileDidLoaded: Promise<any>;

    constructor(
        private storage: Storage
    ) {
        // this.profileDidLoaded = new Promise((resolve, reject) => {
        //     console.log('Promise in service constructor')

        //     this.loadProfile().then(() => {
        //         console.log('loadProfile() finished.')
        //         resolve(true);
        //     });
        // });

        this.profileDidLoaded = this.loadProfile();

    }

    async loadProfile() {
        let jsonObject = await this.storage.get('profile')
        console.log("loadProfile() what is josn", jsonObject);
        if (jsonObject != null) {
            this.profile = Profile.deserialize(jsonObject);
        } else {
            this.profile = new Profile();
        }
    }

    public reset() {
        this.profile = new Profile();
        this.saveProfile();
    }

    /**
     * Set
     */

    set name(name: string) {
        this.setItem('name', name);
    }

    set birthday(birthday: any) {
        this.setItem('birthday', birthday);
    }

    set cakeType(cakeType: string) {
        this.setItem('cakeType', cakeType);
    }

    set cakeFrosting(cakeFrosting: string) {
        this.setItem('cakeFrosting', cakeFrosting);
    }

    set giftIdeas(giftIdeas: any[]) {
        this.setItem('giftIdeas', giftIdeas);
    }

    set isGlutenFree(isGlutenFree: boolean) {
        this.setItem('isGlutenFree', isGlutenFree);
    }

    setItem(itemName: string, item: any) {
        if (item == undefined) { /** will check for both null and undefined */
            return;
        }
        this.profile[itemName] = item;
        console.log(`Saving profile, when setting ${itemName}`);
        this.saveProfile();
    }

    saveProfile() {
        console.log(`serialized value ${this.profile.serialize()}`);

        this.storage.set('profile', this.profile.serialize());
    }


    /**
     * Get
     */

    get name() {
        return this.profile.name;
    }

    get birthday() {
        return this.profile.birthday;
    }

    get cakeType() {
        return this.profile.cakeType;
    }

    get cakeFrosting() {
        return this.profile.cakeFrosting;
    }

    get isGlutenFree() {
        return this.profile.isGlutenFree;
    }

    get giftIdeas() {
        return this.profile.giftIdeas;
    }

    /**
     * Print Helper
     */

    getNameString() {
        let nameString = this.profile.listItem('name')
        return (nameString == "") ? "Not Provided" : nameString;
    }

    getBirthdayString() {
        let value = this.profile.listItem('birthday');
        if (value instanceof Date) {
            console.log("getBirthdayString; what is the value", value);
            return this.profile.listItem('birthday').toJSON();
        } else {
            return "Not provided"
        }
    }

    getCakeTypeString() {
        return this.profile.listItem('cakeType');
    }

    getCakeFrostingString() {
        return this.profile.listItem('cakeFrosting');
    }

    getIsGlutenFreeString() {
        return this.profile.listItem('isGlutenFree') ? "Yes" : "No";
    }

    getGiftIdeasString() {
        let value = this.profile.listItem('giftIdeas');
        if (value == null) {
            return "";
        }

        let checkedGiftIdeas = value.filter((g) => {
            return g.isChecked;
        });
        checkedGiftIdeas = checkedGiftIdeas.map((g) => {
            return g.title;
        });

        let ideas: any[] = [];
        for (let idea of checkedGiftIdeas) {
            ideas.push(idea);
        }

        return ideas.join(", ");
    }
}
