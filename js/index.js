//gets the scores stored in the local storage
function setLocal(key, value) {
    localStorage.setItem(key, value);
}

function getLocal(key) {
    return localStorage.getItem(key);
}

if (getLocal('init') == null) {
    // initialization of scores
    for (var i = 0; i < 5; i += 1) {
        setLocal(i, '99999999,999');
    }

    setLocal('init') == 'true';
}

// displays the rotating cube in the main menu
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x6215B6 } );
var cube = new THREE.Mesh( geometry, material );

var geo = new THREE.EdgesGeometry(cube.geometry); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
var wireframe = new THREE.LineSegments(geo, mat);
cube.add(wireframe);
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
