export default class Exhibit {
    constructor(name, description, image = "playExample.webp") {
        this._name = name;
        this._description = description;
        this._image = image;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }
    get image() {
        return this._image;
    }

    set name(newName) {
        this._name = newName;
    }

    set description(newDescription) {
        this._description = newDescription;
    }
    set image(newImage) {
        this._image = newImage;
    }

    displayInfo() {
        console.log(`Name: ${this._name}`);
        console.log(`Description: ${this._description}`);
    }
}

