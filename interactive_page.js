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

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

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

// timeline created
var timelineAnim = new TimelineLite({
    paused: true,
    delay: 0.5
});

// box animation added on the timeine
timelineAnim.to(box.scale, {
    duration: 1,
    x: 2,
    ease: Expo.easeOut
}).to(box.scale, {
    duration: 1,
    x: 0.5,
    ease: Expo.easeOut
}).to(box.position, {
    duration: 1,
    x: 2,
    ease: Expo.easeOut
}).to(box.rotation, {
    duration: 2,
    y: Math.PI * 0.5,
    ease: Expo.easeOut
});

window.addEventListener("mousemove", onMouseMove);

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
        timelineAnim.play();
    }
}

// game logic goes here
var update = function () {

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

//call gameloop once
gameLoop();

// renderer is added to the dom element
container.appendChild(renderer.domElement);