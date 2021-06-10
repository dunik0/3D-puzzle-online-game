import { Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';

export default class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);


        this.render();
    }

    render() {

        console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);


        requestAnimationFrame(this.render.bind(this));
    }
}
