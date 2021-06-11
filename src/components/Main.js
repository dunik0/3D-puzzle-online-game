import { Scene, GridHelper, CylinderGeometry, MeshBasicMaterial, Mesh } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from './Renderer';
import Camera from './Camera';
import Cylinder from './Cylinder';

export default class Main {
    constructor(container) {
        // właściwości klasy
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, this.container);
        this.camera = new Camera(this.renderer.threeRenderer);

        this.controls = new OrbitControls(this.camera.threeCamera, this.renderer.threeRenderer.domElement);

        const gridHelper = new GridHelper(1000, 10);
        this.scene.add(gridHelper);

        // const geometry = new CylinderGeometry(50, 50, 50, 8);
        // const material = new MeshBasicMaterial({ color: 0x000000 });
        // const cylinder = new Mesh(geometry, material);
        // this.scene.add(cylinder);

        this.cylinder1 = new Cylinder(this.scene, { x: 0, y: 25, z: 0 })
        this.cylinder2 = new Cylinder(this.scene, { x: 0, y: 75, z: 0 })
        this.cylinder3 = new Cylinder(this.scene, { x: 0, y: 125, z: 0 })

        this.render();
    }
    render() {

        console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);


        requestAnimationFrame(this.render.bind(this));
    }
}
