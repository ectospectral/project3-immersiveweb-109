import * as THREE from 'three';

import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models


let scene, camera, renderer, pyramid;

function init(){
    scene = new THREE.Scene();
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1,1,5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.ConeGeometry(2, 2, 4);

    const texture = new THREE.TextureLoader().load('textures/brick.jpg');

    const material = new THREE.MeshBasicMaterial({ map: texture });
    pyramid = new THREE.Mesh( geometry, material );

    scene.add(pyramid);
    camera.position.z = 5;
}

function animate() {
	requestAnimationFrame( animate );
    pyramid.rotation.y += 0.01;
	renderer.render( scene, camera );
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

