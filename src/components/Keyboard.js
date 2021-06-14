import Config from "./Config";

const KEYS = {
    "left": 65,
    "up": 87,
    "right": 68,
    "down": 40,
    'salut': 70
};

export default class Keyboard {
    constructor(domElement) {

        this.domElement = domElement;


        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);


    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KEYS.up:
                Config.moveForward = false;
                break;
            case KEYS.left:
                Config.rotateLeft = false;
                break;
            case KEYS.right:
                Config.rotateRight = false;
                break;
            case KEYS.salut:
                Config.salut = false;
                break;


        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.up:
                Config.moveForward = true;
                break;
            case KEYS.left:
                Config.rotateLeft = true;
                break;
            case KEYS.right:
                Config.rotateRight = true;
                break;
            case KEYS.salut:
                Config.salut = true;
                break;
        }

    }


}