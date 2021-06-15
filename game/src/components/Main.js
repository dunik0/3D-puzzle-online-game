import { Scene, GridHelper, CylinderGeometry, MeshBasicMaterial, Mesh, AmbientLight, Raycaster, Vector2, Vector3 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from './Renderer';
import Camera from './Camera';
import Cube from './Cube';
import Game from './Game';
import Ray from './Ray';
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
        light.position.set(100, 100, 100)
        this.scene.add(light)

        this.cubeTable = [];
        this.cube = new Cube(this.scene, 2, this.cubeTable)
        this.presentHexFloor = this.cubeTable[1];



        //RAYCATER
        this.ray = new Ray(this.scene, this.camera, this.cubeTable)

        window.addEventListener('click', (event) => {
            this.ray.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.ray.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.ray.move();
        })

        this.game = new Game()

        document.querySelector('#end').addEventListener('click', () => { this.game.checkIfDone(this.cubeTable) })

        this.render();
    }
    render() {



        this.cubeTable.forEach((oneHexagon) => {
            // console.log(oneHexagon)
            oneHexagon.forEach((element) => {
                // console.log(element)
                if (element != 0) {
                    if (oneHexagon == this.presentHexFloor) {
                        element.scale.set(0.85, 0.85, 0.85)
                    } else {
                        element.scale.set(1, 1, 1)
                    }
                }


            })
        })


        // console.log("render leci")
        window.onkeyup = (e) => {
            let angleToRotate = Math.PI / 3; // zmienna w której definiuje o ile ma się obracac poziom kostki(o 60 stopni)
            let presentFloorIndex = 1;
            this.cubeTable.forEach((floor, index) => { //w tym foreach'u wyznaczam który poziom całej kostki obecnie obracamy i daje to do zmiennej presentFloorIndex 
                if (floor == this.presentHexFloor) {
                    presentFloorIndex = index;
                }
            })
            if (e.keyCode == 68 || e.keyCode == 39) {

                // this.presentHexFloor.rotation.y += angleToRotate;
                let lastMesh = this.presentHexFloor.pop();
                this.presentHexFloor.unshift(lastMesh)

                for (let i = 0; i < 6; i++) {
                    let oneElement = this.presentHexFloor[i]
                    if (oneElement != 0) {
                        oneElement.position.x = Math.sin(Math.PI / 3 * i) * (60 - (60 / 8))
                        oneElement.position.z = Math.cos(Math.PI / 3 * i) * (60 - (60 / 8))
                        oneElement.lookAt(new Vector3(0, 55 * presentFloorIndex, 0))
                    }
                }
                // this.cube.cube[presentFloorIndex].rotation.y += angleToRotate
                console.log(this.cubeTable[presentFloorIndex])

            } else if (e.keyCode == 65 || e.keyCode == 37) {

                let firstMesh = this.presentHexFloor.shift();
                this.presentHexFloor.push(firstMesh)
                for (let i = 0; i < 6; i++) {
                    let oneElement = this.presentHexFloor[i]
                    if (oneElement != 0) {
                        oneElement.position.x = Math.sin(Math.PI / 3 * i) * (60 - (60 / 8))
                        oneElement.position.z = Math.cos(Math.PI / 3 * i) * (60 - (60 / 8))
                        oneElement.lookAt(new Vector3(0, 55 * presentFloorIndex, 0))
                    }
                }
                // this.cube.cube[presentFloorIndex].rotation.y -= angleToRotate
                console.log(this.cubeTable[presentFloorIndex])
            } else if (e.keyCode == 87 || e.keyCode == 38) {

                if (this.cubeTable[presentFloorIndex + 1] != undefined) {
                    this.presentHexFloor = this.cubeTable[presentFloorIndex + 1];
                }
            } else if (e.keyCode == 83 || e.keyCode == 40) {

                if (this.cubeTable[presentFloorIndex - 1] != undefined) {
                    this.presentHexFloor = this.cubeTable[presentFloorIndex - 1];
                }

            }

        }


        this.renderer.render(this.scene, this.camera.threeCamera);


        requestAnimationFrame(this.render.bind(this));
    }
}
