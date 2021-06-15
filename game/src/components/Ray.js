import { Raycaster, Vector2, Vector3 } from 'three';

export default class Ray {

    constructor(scene, camera, cubeTable) {
        this.scene = scene
        this.camera = camera
        this.cubeTable = cubeTable
        this.raycaster = new Raycaster();
        this.mouseVector = new Vector2();
        this.intersects = []


    }
    move() {

        this.raycaster.setFromCamera(this.mouseVector, this.camera.threeCamera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children, true);
        // console.log(this.cubeTable[0].children[0])
        // console.log(this.cubeTable)

        if (this.intersects.length > 0) {

            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
            let clickedElementIndex = null;
            let numberOfClickedFloor = null;
            let floorWithZero = null;
            let zeroElementIndex = null;
            this.cubeTable.forEach((floor, index) => {
                if (floor.includes(this.intersects[0].object)) {
                    if (!floor.includes(0)) {
                        clickedElementIndex = floor.indexOf(this.intersects[0].object)
                        numberOfClickedFloor = index
                    }
                } if (floor.includes(0)) {
                    floorWithZero = index;
                    zeroElementIndex = floor.indexOf(0);
                }
            })

            if (clickedElementIndex != null && numberOfClickedFloor != null) {
                if (numberOfClickedFloor < floorWithZero) {
                    if (this.cubeTable[numberOfClickedFloor + 1][clickedElementIndex] == 0) {
                        this.cubeTable[numberOfClickedFloor + 1][clickedElementIndex] = this.cubeTable[numberOfClickedFloor][clickedElementIndex];
                        this.cubeTable[numberOfClickedFloor + 1][clickedElementIndex].position.y += 55;
                        this.cubeTable[numberOfClickedFloor][clickedElementIndex] = 0;
                    }

                } else if (numberOfClickedFloor > floorWithZero) {
                    if (this.cubeTable[numberOfClickedFloor - 1][clickedElementIndex] == 0) {
                        this.cubeTable[numberOfClickedFloor - 1][clickedElementIndex] = this.cubeTable[numberOfClickedFloor][clickedElementIndex];
                        this.cubeTable[numberOfClickedFloor - 1][clickedElementIndex].position.y -= 55;
                        this.cubeTable[numberOfClickedFloor][clickedElementIndex] = 0;
                    }
                }
            }

        }
    }



}
