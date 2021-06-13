import { CylinderGeometry, MeshBasicMaterial, Mesh } from 'three';
export default class Cylinder {
    constructor(scene, position) {
        this.geometry = new CylinderGeometry(50, 50, 50, 3);
        this.material = new MeshBasicMaterial({ color: 0x000000 });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.x = position.x
        this.mesh.position.y = position.y
        this.mesh.position.z = position.z
        scene.add(this.mesh);
    }
}