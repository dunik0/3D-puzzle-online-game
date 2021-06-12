import { Scene, GridHelper, CylinderGeometry, MeshBasicMaterial, Mesh, AmbientLight } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from './Renderer';
import Camera from './Camera';
import Cylinder from './Cylinder';
import Hex3D from './Hex';

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

        const light = new AmbientLight(0xffffff, 1)
        light.position.set(1000, 1000, 1000)
        this.scene.add(light)
        // const geometry = new CylinderGeometry(50, 50, 50, 8);
        // const material = new MeshBasicMaterial({ color: 0x000000 });
        // const cylinder = new Mesh(geometry, material);
        // this.scene.add(cylinder);

        // w tej pentli dodaje 3 hexagony do sceny 
        for (let i = 0; i < 3; i++) {
            let missElement = 2; // numer elementu który ma brakować
            if (i == 2) {
                let hexa = new Hex3D(60, missElement);// pierwszy parametr to promien jak bardzo ma być oddalony element od środka
                hexa.position.y = i * 55;  // tu ustawiam pozycję pojedynczego hexagonu
                this.scene.add(hexa)
            } else {
                let hexa = new Hex3D(60);
                hexa.position.y = i * 55;
                this.scene.add(hexa)
            }

        }
        // this.hexagon = new Hex3D(60)
        // this.hexagon.position.y = 25
        // this.scene.add(this.hexagon)
        // this.cylinder1 = new Cylinder(this.scene, { x: 0, y: 25, z: 0 })
        // this.cylinder2 = new Cylinder(this.scene, { x: 0, y: 75, z: 0 })
        // this.cylinder3 = new Cylinder(this.scene, { x: 0, y: 125, z: 0 })

        this.render();
    }
    render() {

        // console.log("render leci")

        this.renderer.render(this.scene, this.camera.threeCamera);


        requestAnimationFrame(this.render.bind(this));
    }
}
