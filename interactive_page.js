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

// new box (x-scale, y-scale, z-scale)
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0xffcc00
});

// create a box with geometery and material created above
var box = new THREE.Mesh(geometry, material);

// add box in the scene
scene.add(box);

// new point light (white color, intensity, range)
var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

// this.tl = new TimelineMax().delay(.3);
// this.tl.to(this.box.scala, 1, {
//     x: 10,
//     ease: Expo.easeOut
// });

tl = gsap.timeline().delay(.3);
tl.to(box.scala, 1, {
    y: 2,
    ease: Expo.easeOut
});


// game logic goes here
var update = function () {
    //animation, rotation on y-axix
    // box.rotation.y += 0.05;
};

// draw scene
var render = function () {
    renderer.render(scene, camera);
};

// run game loop (update, render, repeat)
var gameLoop = function () {
    requestAnimationFrame(gameLoop);
    update();
    render();
};

gameLoop();

// renderer is added to the dom element
container.appendChild(renderer.domElement);