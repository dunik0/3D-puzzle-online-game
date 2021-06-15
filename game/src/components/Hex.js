import { MeshPhongMaterial, Mesh, BoxGeometry, Object3D, AmbientLight, CylinderGeometry, TextureLoader, DoubleSide } from 'three';
import Texture1 from '../images/plik2.png'
import Texture2 from '../images/plik.png'
export default class Hex3D extends Object3D {

    constructor(radius, table, colorTable, missingElement) {

        super()
        this.radius = radius;
        this.missingElement = missingElement;
        this.texture1 = new TextureLoader().load(Texture1)
        this.texture2 = new TextureLoader().load(Texture2)
        this.colorTable = colorTable;
        const geometry = new CylinderGeometry(50, 50, 50, 3);
        // prostopadłościan - jedna ściana hex-a
        this.allElements = []
        for (let i = 0; i < 6; i++) {

            const material = new MeshPhongMaterial({ color: this.colorTable[i], flatShading: true, map: this.texture2, shininess: 100 })
            const wall = new Mesh(geometry, material);

            if (i != this.missingElement) {
                let side = wall.clone()                         // klon ściany
                side.position.x = Math.sin(Math.PI / 3 * i) * (this.radius - (this.radius / 8))        // punkt na okręgu, do obliczenia
                side.position.z = Math.cos(Math.PI / 3 * i) * (this.radius - (this.radius / 8))       // punkt na okręgu, do obliczenia      
                // punkt na okręgu, do obliczenia      
                side.backgroundColor = this.colorTable[i];
                side.lookAt(this.position)    // nakierowanie ściany na środek kontenera 3D  
                this.add(side)
                this.allElements.push(side);      // dodanie ściany do kontenera
                // table.push(side);
            } else {
                this.allElements.push(0)

            }
        }
        table.push(this.allElements)

    }
    removeElement(elementToRemove) {
        this.children = this.children.filter((element, index) => {
            if (index != elementToRemove) {
                return element
            }
        })


    }

}
