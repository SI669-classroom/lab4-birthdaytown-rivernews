export class Profile {
    public name: string = "";
    public birthday: any = "";
    public cakeType: any = "";
    public cakeFrosting: any = "";
    public isGlutenFree: boolean = false;
    public giftIdeas: any[] = [];
    
    constructor(giftIdeas?) {
        // TODO: check storage and load in data first

        // default giftIdeas
        if (giftIdeas == null) {
            this.giftIdeas = [
                {
                    title: "Books",
                    isChecked: false
                },
                {
                    title: "Shoes",
                    isChecked: false
                },
                {
                    title: "Food",
                    isChecked: false
                },
            ];
        }

    }

    addItem(itemName: string, item: any) {
        this[itemName].push(item);
    }

    /**
     * Print
     */

    listItem(itemName: string) {
        return this[itemName];
    }

    serialize() {
        let serialized = {};
        let properties: Array<string> = ['name', 'birthday', 'cakeType', 'cakeFrosting', 'isGlutenFree', 'giftIdeas'];
        for (let property of properties) {
            if (property === "birthday") {
                try {
                    serialized[property] = this[property].toJSON();

                } catch (e) {
                    if (e instanceof TypeError) {
                        serialized[property] = "";
                    }
                }
            } else {
                serialized[property] = this[property];
            }

        }
        return JSON.stringify(serialized);
    }

    static deserialize(rawJsonObject: string) {
        let jsonObject = JSON.parse(rawJsonObject);
        let newProfile = new Profile();
        let properties: Array<string> = ['name', 'birthday', 'cakeType', 'cakeFrosting', 'isGlutenFree', 'giftIdeas'];

        for (let prop of properties) {
            if (prop === "birthday") {
                try {
                    console.log("prop is",prop,"birthday string is", jsonObject[prop], "the whole obj", jsonObject);
                    newProfile[prop] = new Date(jsonObject[prop]);
                } catch (e) {
                    if (e instanceof TypeError) {
                        newProfile[prop] = new Date();
                    }
                    else {
                        throw Error(e);
                    }
                }
                console.log("dese. birthday, result is", newProfile[prop]);
            } else {
                newProfile[prop] = jsonObject[prop];
            }
        }

        return newProfile;
    }
}