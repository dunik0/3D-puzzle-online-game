import { PerspectiveCamera, Vector3 } from 'three';

export default class Camera {
    constructor(renderer) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;

        this.threeCamera = new PerspectiveCamera(75, width / height, 0.1, 10000);
<<<<<<< HEAD
        this.threeCamera.position.set(2, 2, 2);
        this.threeCamera.lookAt(new Vector3(0, 0, 0))

=======
        this.threeCamera.position.set(200, 200, 200);
        this.threeCamera.lookAt(new Vector3(0, 0, 0))


>>>>>>> 4dba89dadba3fac1a581e440add553da340abbd5
        this.updateSize(renderer);

        window.addEventListener('resize', () => this.updateSize(renderer), false);
    }

    updateSize(renderer) {

        this.threeCamera.aspect = renderer.domElement.width / renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }
}