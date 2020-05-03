// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// Scene is created
var scene = new THREE.Scene();

// Camera is created
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer is created
var renderer = new THREE.WebGLRenderer({
    antialias: true
});

// set background color
renderer.setClearColor("#e5e5e5");

// set size of the canvas
renderer.setSize(window.innerWidth, window.innerHeight);

// to make the canvas resposive we are listeninig to the resize event 
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// new sphere (radius, width segments, height segments)
var geometry = new THREE.SphereGeometry(1, 100, 100);
var material = new THREE.MeshLambertMaterial({
    color: 0xffcc00
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// new point light (white color, intensity, range)
var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

// scene and camera to the renderer
renderer.render(scene, camera);

// renderer is added to the dom element
container.appendChild(renderer.domElement);