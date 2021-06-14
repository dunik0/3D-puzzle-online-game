import { MeshPhongMaterial, Mesh, BoxGeometry, Object3D, AmbientLight, CylinderGeometry, TextureLoader, DoubleSide } from 'three';
import Texture1 from '../images/plik2.png'
import Texture2 from '../images/plik.png'
export default class Hex3D extends Object3D {

    constructor(radius, missingElement) {

        super()
        this.radius = radius;
        this.missingElement = missingElement;
        this.texture1 = new TextureLoader().load(Texture1)
        this.texture2 = new TextureLoader().load(Texture2)
        this.colorTable = [0xff0000, 0x00ff00, 0x0000ff, 0xffa500, 0x40e0d0, 0xf6546a]
        const geometry = new CylinderGeometry(50, 50, 50, 3);
        // prostopadłościan - jedna ściana hex-a

        for (let i = 0; i < 6; i++) {
            const material = new MeshPhongMaterial({ color: this.colorTable[i], flatShading: true, map: this.texture1, shininess: 100 })
            // materials.push(new MeshPhongMaterial({ color: this.colorTable[i], flatShading: true, map: this.texture2, shininess: 100 }))

            const wall = new Mesh(geometry, material);
            if (i != this.missingElement) {
                let side = wall.clone()                         // klon ściany
                side.position.x = Math.sin(Math.PI / 3 * i) * (this.radius - (this.radius / 8))        // punkt na okręgu, do obliczenia
                side.position.z = Math.cos(Math.PI / 3 * i) * (this.radius - (this.radius / 8))       // punkt na okręgu, do obliczenia      
                // punkt na okręgu, do obliczenia      

                side.lookAt(this.position)    // nakierowanie ściany na środek kontenera 3D  
                this.add(side)           // dodanie ściany do kontenera

            }

        }

    }
    removeElement(elementToRemove) {
        this.children = this.children.filter((element, index) => {
            if (index != elementToRemove) {
                return element
            }
        })


    }

}
