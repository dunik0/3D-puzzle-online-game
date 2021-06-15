import Hex3D from "./Hex";

export default class Cube {
    constructor(scene, missElement, table) {
        this.scene = scene;
        this.colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffa500, 0x40e0d0, 0xd624fa, 0xff0000, 0x00ff00, 0x0000ff, 0xffa500, 0x40e0d0, 0xd624fa, 0xff0000, 0x00ff00, 0x0000ff, 0xffa500, 0x40e0d0, 0xd624fa]
        this.missElement = missElement;
        this.cube = []
        for (let i = 0; i < 3; i++) {
            if (i == 2) {
                let tabelka = this.makeColorsTable()

                let hexa = new Hex3D(60, table, tabelka, this.missElement);// pierwszy parametr to promien jak bardzo ma być oddalony element od środka
                hexa.position.y = i * 55;  // tu ustawiam pozycję pojedynczego hexagonu
                this.cube.push(hexa)
                this.scene.add(hexa)

            } else {
                let hexa = new Hex3D(60, table, this.makeColorsTable());
                hexa.position.y = i * 55;
                this.cube.push(hexa)
                this.scene.add(hexa)

            }
        }


    }
    makeColorsTable() {
        let table = []

        for (let i = 0; i < 6; i++) {

            let randomNumber = Math.floor(Math.random() * (this.colors.length - 1))
            table.push(this.colors[randomNumber])
            this.colors.splice(randomNumber, 1)
        }
        console.log(this.colors)
        return table
    }



}