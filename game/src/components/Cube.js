import Hex3D from "./Hex";

export default class Cube {
    constructor(scene, missElement, table) {
        this.scene = scene;

        this.missElement = missElement;
        this.cube = []
        for (let i = 0; i < 3; i++) {
            if (i == 2) {
                let hexa = new Hex3D(60, table, this.missElement);// pierwszy parametr to promien jak bardzo ma być oddalony element od środka
                hexa.position.y = i * 55;  // tu ustawiam pozycję pojedynczego hexagonu
                this.cube.push(hexa)
                this.scene.add(hexa)

            } else {
                let hexa = new Hex3D(60, table);
                hexa.position.y = i * 55;
                this.cube.push(hexa)
                this.scene.add(hexa)

            }
        }
        // console.log('sssssssssss')

    }


}