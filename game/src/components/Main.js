import { Scene, GridHelper, CylinderGeometry, MeshBasicMaterial, Mesh, AmbientLight, Raycaster, Vector2 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Renderer from './Renderer';
import Camera from './Camera';
import Cylinder from './Cylinder';
import Keyboard from './Keyboard';
import Config from './Config';
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
        light.position.set(100, 100, 100)
        this.scene.add(light)

        // this.cylinder = new Cylinder(this.scene, { x: 200, y: 25, z: 200 })

        this.cube = []
        // w tej pentli dodaje 3 hexagony do sceny 
        for (let i = 0; i < 3; i++) {
            let missElement = 2; // numer elementu który ma brakować
            if (i == 2) {
                let hexa = new Hex3D(60, missElement);// pierwszy parametr to promien jak bardzo ma być oddalony element od środka
                hexa.position.y = i * 55;  // tu ustawiam pozycję pojedynczego hexagonu
                this.cube.push(hexa)
                this.scene.add(hexa)
            } else {
                let hexa = new Hex3D(60);
                hexa.position.y = i * 55;
                this.cube.push(hexa)
                this.scene.add(hexa)
            }

        }
        this.presentHexFloor = this.cube[1];

        // this.keyboard = new Keyboard(window)


        // let tempPosition = this.cube[0].children[0].position;
        // console.log(tempPosition)
        // this.cube[0].remove(this.cube[0].children[0])

        // this.cube[0].children[0] = this.cube[0].children[3].clone()
        // this.cube[0].children[0].position.set(tempPosition.x, tempPosition.y, tempPosition.z)


        //RAYCATER
        console.log(this.scene.children)
        this.raycaster = new Raycaster();
        this.mouseVector = new Vector2();
        this.intersects = []


        window.addEventListener('click', (event) => {
            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouseVector, this.camera.threeCamera);
            this.intersects = this.raycaster.intersectObjects(this.scene.children, true);
            // console.log(this.cube[0].children[0])
            if (this.intersects.length > 0) {

                // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:


                this.intersects[0].object.position.y += 55;
                // this.cube[2].removeElement(0)
                console.log(this.cube[2].children)
            }
        })

        this.startTime = new Date().getTime();
        console.log(this.startTime)
        document.querySelector('#end').addEventListener('click', async () => {
            const endTime = new Date().getTime();
            const time = endTime - this.startTime;
            const lobbyID = this.getCookie('lobbyid')
            await fetch('/end', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    lobby: lobbyID,
                    nick: this.getCookie('username'),
                    time: time
                })
            })
            location.href = '/scoreboard?id=' + lobbyID
        })

        this.render();
    }
    render() {



        this.cube.forEach((oneHexagon) => {
            // console.log(oneHexagon)
            oneHexagon.children.forEach((element) => {

                if (oneHexagon == this.presentHexFloor) {
                    element.scale.set(0.85, 0.85, 0.85)
                } else {
                    element.scale.set(1, 1, 1)
                }



            })
        })


        // console.log("render leci")
        window.onkeyup = (e) => {
            let angleToRotate = Math.PI / 3; // zmienna w której definiuje o ile ma się obracac poziom kostki(o 60 stopni)
            let presentFloorIndex = 1;
            this.cube.forEach((floor, index) => { //w tym foreach'u wyznaczam który poziom całej kostki obecnie obracamy i daje to do zmiennej presentFloorIndex 
                if (floor == this.presentHexFloor) {
                    presentFloorIndex = index;
                }
            })
            if (e.keyCode == 68 || e.keyCode == 39) {
                this.presentHexFloor.rotation.y += angleToRotate;
            } else if (e.keyCode == 65 || e.keyCode == 37) {
                this.presentHexFloor.rotation.y -= angleToRotate;
            } else if (e.keyCode == 87 || e.keyCode == 38) {

                if (this.cube[presentFloorIndex + 1] != undefined) {
                    this.presentHexFloor = this.cube[presentFloorIndex + 1];
                }
            } else if (e.keyCode == 83 || e.keyCode == 40) {

                if (this.cube[presentFloorIndex - 1] != undefined) {
                    this.presentHexFloor = this.cube[presentFloorIndex - 1];
                }

            }
        }


        this.renderer.render(this.scene, this.camera.threeCamera);


        requestAnimationFrame(this.render.bind(this));
    }
    getCookie(cookieName) {
        const name = cookieName + '='
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let c = cookieArray[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
}
