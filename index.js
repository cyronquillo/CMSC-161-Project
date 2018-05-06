var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x6215B6 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};


var scene2 = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );

var geometry2 = new THREE.BoxGeometry( -1, -12, -1 );
var material2 = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
var cube2 = new THREE.Mesh( geometry2, material2 );
scene2.add( cube2 );

camera2.position.z = 5;

var animate2 = function () {
    requestAnimationFrame( animate2 );

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    renderer.render(scene2, camera2);
};

var animate3 = function () {
    requestAnimationFrame( animate );

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    renderer.render(scene, camera);
};
